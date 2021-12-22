import type { IconProps } from "../types";

export interface ThemeConfig {
  color: string;
  activeColor: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
}

export const light: ThemeConfig = {
  color: "#5D5D5D",
  activeColor: "#3381FF",
  backgroundColor: "#fff",
  hoverBackgroundColor: "rgba(51, 129, 255, 0.1)",
};

export const dark: ThemeConfig = {
  ...light,
  color: "#eee",
  backgroundColor: "#111",
};

export const themes = { light, dark };

export const getStroke = (props: IconProps) => {
  let config;
  if (props.theme) {
    config = themes[props.theme];
  } else {
    config = themes.light;
  }
  return props.active ? config.activeColor : config.color;
};

export const TopOffset = [0, 11] as [number, number];
export const RightOffset = [0, 14] as [number, number];
