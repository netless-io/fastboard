export interface SvelteAction<T = void> {
  (
    node: HTMLElement,
    parameters: T
  ): void | {
    update?: (parameters: T) => void;
    destroy?: () => void;
  };
}

export type Theme = "light" | "dark";

export type Language = "en" | "zh-CN";

export type IconType = "normal" | "disable";
export type GenericIcon<K extends string, E extends string = IconType> = {
  [key in K]: { [kind in E]: string };
};

export type I18nData<T extends string> = Record<Language, Record<T, string>>;

export interface ToolbarConfig {
  apps?: {
    enable?: boolean;
  };
}

export interface FastboardUIConfig {
  toolbar?: {
    enable?: boolean;
  } & ToolbarConfig;
  redo_undo?: {
    enable?: boolean;
  };
  zoom_control?: {
    enable?: boolean;
  };
  page_control?: {
    enable?: boolean;
  };
}
