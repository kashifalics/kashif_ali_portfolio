import Image from "next/image";
import { profile } from "@/data/profile";
import { ProfilePhoto } from "./ProfilePhoto";

/**
 * The cut-out portrait on a cyan disc inside a hand-painted electric-blue ring.
 * The ring's brushed edge comes from an SVG turbulence filter, so it is drawn,
 * not an image. Falls back to the ordinary photo when there is no cut-out.
 */
export function HeroPortrait() {
  const { cutout, alt } = profile.photo;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px]">
      <svg viewBox="0 0 500 500" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed="11" />
            <feDisplacementMap in="SourceGraphic" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g filter="url(#brush)" fill="none" stroke="#2563eb" strokeLinecap="round">
          <circle cx="250" cy="250" r="214" strokeWidth="30" />
          <circle cx="250" cy="250" r="234" strokeWidth="9" strokeDasharray="300 110 180 160" transform="rotate(-30 250 250)" />
          <circle cx="250" cy="250" r="196" strokeWidth="7" strokeDasharray="140 260 220 300" transform="rotate(120 250 250)" />
          <path d="M 418 96 l 26 -22 M 432 120 l 30 -16 M 86 404 l -24 20" strokeWidth="9" />
        </g>
        <circle cx="250" cy="250" r="200" fill="#38bdf8" />
      </svg>

      <div className="absolute inset-[10%] overflow-hidden rounded-full">
        {cutout ? (
          <Image
            src={cutout}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 352px, 256px"
            className="object-cover object-[50%_22%]"
          />
        ) : (
          <ProfilePhoto priority sizes="400px" className="size-full" />
        )}
      </div>
    </div>
  );
}
