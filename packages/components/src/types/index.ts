import type { Room } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";

export type Theme = "light" | "dark";

export interface CommonProps {
  room?: Room;
  manager?: WindowManager;
  theme?: Theme;
}

export type GenericIcon<T extends string> = Record<T, string> &
  Partial<Record<`${T}Active`, string>> &
  Partial<Record<`${T}Disable`, string>>;

export type RedoUndoProps = CommonProps & {
  undoIcon: GenericIcon<"undo">;
  redoIcon: GenericIcon<"redo">;
};
