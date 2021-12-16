export interface ThemeConfig {
  color: string;
  activeColor: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
}

export const light: ThemeConfig = {
  color: "#1A1E21",
  activeColor: "#3381FF",
  backgroundColor: "#fff",
  hoverBackgroundColor: "rgba(51, 129, 255, 0.1)",
};

export const dark: ThemeConfig = {
  ...light,
  color: "#eee",
  activeColor: "#fff",
  backgroundColor: "#111",
};

export const themes = { light, dark };
