import type { JSX } from "preact";

export interface IconPropsWithFallback {
  fallback: JSX.Element;
  src?: string;
  alt?: string;
}

export function Icon({ fallback, src, alt = "[icon]" }: IconPropsWithFallback) {
  return src ? <img src={src} alt={alt} title={alt} /> : fallback;
}
