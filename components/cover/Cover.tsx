"use client";

import Image, { ImageProps } from "next/image";
import { useMemo, useState } from "react";

function hashString(str: string): number {
  let h = 0;

  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }

  return Math.abs(h);
}

function hslFromHash(h: number, s = 70, l = 45): string {
  const hue = h % 360;

  return `hsl(${hue} ${s}% ${l}%)`;
}

function getInitials(text?: string, max = 2): string {
  const t = (text || "").trim();

  if (!t) return "?";

  const parts = t.split(/\s+/).filter(Boolean);
  const initials = parts
    .slice(0, max)
    .map((p) => p[0])
    .join("");

  return initials.toUpperCase();
}

function svgCover(title: string, w: number, h: number): string {
  const hash = hashString(title || "Cover");
  const c1 = hslFromHash(hash);
  const c2 = hslFromHash(hash >> 1, 70, 35);
  const initials = getInitials(title);
  const fontSize = Math.round(Math.min(w, h) * 0.28);
  const radius = Math.round(Math.min(w, h) * 0.12);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-opacity="0.25" />
    </filter>
  </defs>
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#g)" rx="${radius}" ry="${radius}" />
  <g filter="url(#shadow)">
    <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" 
      font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, sans-serif" 
      font-size="${fontSize}" font-weight="700" fill="white" letter-spacing="2">
      ${initials}
    </text>
  </g>
  <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="rgba(255,255,255,0.18)" rx="${radius}" ry="${radius}" />
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export type CoverProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt?: string | null;
  fallbackTitle?: string;
};

export default function Cover({
  src,
  alt,
  width = 800,
  height = 400,
  fallbackTitle,
  className,
  ...rest
}: CoverProps) {
  const title = fallbackTitle || alt || "Cover";
  const fallback = useMemo(
    () => svgCover(title, Number(width), Number(height)),
    [title, width, height],
  );
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallback);

  return (
    <Image
      alt={alt || title}
      className={className}
      height={height}
      src={currentSrc}
      width={width}
      {...rest}
      onError={() => setCurrentSrc(fallback)}
    />
  );
}
