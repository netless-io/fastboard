export type Theme = "light" | "dark";
export type Language = "en" | "zh-CN";

export type I18nData<K extends string> = Record<Language, Record<K, string>>;
