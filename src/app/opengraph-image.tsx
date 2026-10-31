import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  let photo: string | null = null;
  if (profile.photo.src) {
    try {
      const buf = await readFile(path.join(process.cwd(), "public", profile.photo.src));
      photo = `data:image/jpeg;base64,${buf.toString("base64")}`;
    } catch {
      photo = null;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "radial-gradient(ellipse at 80% 0%, #10304a 0%, #070b14 60%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ fontSize: 22, color: "#38bdf8", letterSpacing: 3 }}>AI ENGINEER · ENTREPRENEUR</div>
          <div style={{ fontSize: 68, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ fontSize: 30, color: "#a8b5c7", marginTop: 24, lineHeight: 1.3 }}>
            Where AI meets engineering. Where ideas become products.
          </div>
        </div>
        {photo && (
          <div style={{ display: "flex", width: 330, height: 330, borderRadius: 330, border: "4px solid #38bdf8", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={330} height={330} style={{ objectFit: "cover" }} alt="" />
          </div>
        )}
      </div>
    ),
    size,
  );
}
