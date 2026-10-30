import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/site";

/**
 * The profile photograph, cropped by its container. Uses `profile.photo`; with
 * no `src` it draws a neutral placeholder instead of any stand-in face.
 */
export function ProfilePhoto({
  className,
  sizes,
  priority,
}: {
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const { src, alt, focus } = profile.photo;

  if (!src) {
    return (
      <div
        role="img"
        aria-label="Profile photograph coming soon"
        className={cn("grid place-items-center bg-[radial-gradient(circle_at_50%_35%,#152238,#0b1220_70%)]", className)}
      >
        <span className="font-display text-5xl font-semibold text-cyan/70">{profile.initials}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  );
}
