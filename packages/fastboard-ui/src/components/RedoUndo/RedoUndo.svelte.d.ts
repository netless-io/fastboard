import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language, GenericIcon, SvelteComponentTyped } from "../../typings";

export declare interface RedoUndoProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  icons?: GenericIcon<"undo" | "redo">;
}

declare class RedoUndo extends SvelteComponentTyped<RedoUndoProps> {}
export default RedoUndo;
