import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

/* Best-effort rate limit per IP. Serverless instances do not share memory, so
   this slows down a burst from one client; it is not a global guarantee. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const MIN_FILL_MS = 3000;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Try again in a few minutes, or email me directly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The message could not be read. Refresh the page and try again." }, { status: 400 });
  }

  // Spam traps: a hidden field people never see, and a form filled implausibly fast.
  // Bots get a normal-looking success so they don't learn what tripped them.
  const startedAt = Number(body.startedAt);
  if (String(body.website ?? "") !== "" || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const { value, errors, ok } = validateContact(body);
  if (!ok) return NextResponse.json({ error: "Check the highlighted fields.", fields: errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "The contact form isn't connected yet. Use the email link instead.", code: "not_configured" },
      { status: 503 },
    );
  }

  const html = `
    <p><strong>From:</strong> ${escapeHtml(value.name)} &lt;${escapeHtml(value.email)}&gt;</p>
    <p><strong>Subject:</strong> ${escapeHtml(value.subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(value.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: value.email,
        subject: `Portfolio: ${value.subject}`,
        text: `From: ${value.name} <${value.email}>\nSubject: ${value.subject}\n\n${value.message}`,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("contact_send_failed", res.status);
      return NextResponse.json({ error: "The message couldn't be delivered. Try again, or email me directly." }, { status: 502 });
    }
  } catch {
    console.error("contact_send_error");
    return NextResponse.json({ error: "The message couldn't be delivered. Try again, or email me directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
