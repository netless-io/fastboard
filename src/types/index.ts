import type { Room } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";

export type Theme = "light" | "dark";

export interface IconProps {
  theme?: Theme;
  active?: boolean;
}

export interface CommonProps {
  room?: Room | null;
  manager?: WindowManager | null;
  theme?: Theme;
}

export type GenericIcon<
  K extends string,
  E extends string = "disable"
> = Partial<Record<`${K}Icon${Capitalize<E | "">}`, string>>;
