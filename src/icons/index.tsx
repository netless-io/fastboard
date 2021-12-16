import React from "react";
import type { IconProps } from "../types";

export type MergedIconProps = IconProps & {
  Fallback: React.ComponentType<IconProps>;
  src?: string;
  alt?: string;
};

export function Icon({
  theme,
  active,
  Fallback,
  src,
  alt = "[icon]",
}: MergedIconProps) {
  return src ? (
    <img src={src} alt={alt} title={alt} />
  ) : (
    <Fallback theme={theme} active={active} />
  );
}
