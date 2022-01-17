export type Theme = "light" | "dark";
export type Language = "en" | "zh-CN";

export interface IconProps {
  theme?: Theme;
  active?: boolean;
}

export interface CommonProps {
  theme?: Theme;
}

export type GenericIcon<K extends string, E extends string = "disable"> = Partial<
  Record<`${K}Icon${Capitalize<E | "">}`, string>
>;
