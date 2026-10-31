// Server-side only: reads the filesystem at build time.
import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/types";

/** True when a file referenced as "/images/..." exists in /public. */
export function publicFileExists(src?: string) {
  if (!src || !src.startsWith("/")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Drops images whose files have not been added yet, so a missing screenshot
 * falls back to the next genuine visual instead of a broken image.
 */
export function withAvailableAssets(project: Project): Project {
  return {
    ...project,
    cover: project.cover && publicFileExists(project.cover.src) ? project.cover : undefined,
    screenshots: project.screenshots?.filter((s) => publicFileExists(s.src)),
  };
}
