import React from "react";

export interface IconPropsWithFallback {
  fallback: React.ReactElement;
  src?: string;
  alt?: string;
}

export function Icon({ fallback, src, alt = "[icon]" }: IconPropsWithFallback) {
  return src ? <img src={src} alt={alt} title={alt} /> : fallback;
}
