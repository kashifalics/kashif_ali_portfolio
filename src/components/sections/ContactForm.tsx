"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { limits, validateContact, type ContactInput, type FieldErrors } from "@/lib/contact";
import { profile } from "@/data/profile";
import { cn } from "@/lib/site";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; notConfigured?: boolean };

const empty: ContactInput = { name: "", email: "", subject: "", message: "" };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-rose-300">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>({ kind: "idle" });
  const [startedAt] = useState(() => Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (k: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      const first = Object.keys(check.errors)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...check.value, website: honeypot.current?.value ?? "", startedAt }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors; code?: string };
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setState({ kind: "error", message: data.error ?? "The message couldn't be sent.", notConfigured: data.code === "not_configured" });
        return;
      }
      setState({ kind: "sent" });
      setValues(empty);
    } catch {
      setState({ kind: "error", message: "You appear to be offline. Check your connection and try again." });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="card flex flex-col items-center px-6 py-14 text-center">
        <CheckCircle2 className="text-emerald-300" size={36} aria-hidden />
        <h2 className="mt-5 text-2xl font-semibold">Message sent</h2>
        <p className="mt-2 max-w-sm text-fg-2">Thanks for writing. I&apos;ll reply to the email address you gave.</p>
        <button type="button" onClick={() => setState({ kind: "idle" })} className="mt-6 text-sm font-semibold text-cyan hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-xl border bg-bg-2/80 px-4 py-3 text-fg placeholder:text-fg-3 transition-colors focus:border-cyan focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="card relative space-y-5 p-6 sm:p-8" aria-describedby="contact-status">
      {/* Hidden from people; bots tend to fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input ref={honeypot} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">Name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={limits.name.max}
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(field, errors.name ? "border-rose-400/60" : "border-line")}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={limits.email.max}
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(field, errors.email ? "border-rose-400/60" : "border-line")}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="text-sm font-medium">Subject</label>
        <input
          id="contact-subject"
          name="subject"
          maxLength={limits.subject.max}
          value={values.subject}
          onChange={set("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={cn(field, errors.subject ? "border-rose-400/60" : "border-line")}
        />
        <FieldError id="contact-subject-error" message={errors.subject} />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={limits.message.max}
          value={values.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(field, "resize-y", errors.message ? "border-rose-400/60" : "border-line")}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <div id="contact-status" aria-live="polite">
        {state.kind === "error" && (
          <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {state.message}
            {state.notConfigured && profile.email && (
              <>
                {" "}
                <a href={`mailto:${profile.email}`} className="font-semibold underline">
                  Email {profile.email}
                </a>
              </>
            )}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state.kind === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8] disabled:opacity-60 sm:w-auto"
      >
        {state.kind === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={16} /> Send message
          </>
        )}
      </button>
    </form>
  );
}
