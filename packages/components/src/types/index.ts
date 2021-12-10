import type { Room } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";

export type Theme = "light" | "dark";

export interface CommonProps {
  room?: Room;
  manager?: WindowManager;
  theme?: Theme;
}

export interface Icon {
  normal: string;
  disable?: string;
  active?: string;
}

export type IconType = keyof Icon;

export type RedoUndoProps = CommonProps & {
  undoIcon?: Icon;
  redoIcon?: Icon;
};

export type ZoomControlProps = CommonProps & {
  resetIcon?: Icon;
  lessIcon?: Icon;
  plusIcon?: Icon;
};
