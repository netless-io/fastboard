export * from "./typings";

export { default as RedoUndo, type RedoUndoProps } from "./components/RedoUndo";
export { default as PageControl, type PageControlProps } from "./components/PageControl";
export { default as ZoomControl, type ZoomControlProps } from "./components/ZoomControl";
export { default as Toolbar, type ToolbarProps } from "./components/Toolbar";
export { default as PlayerControl, type PlayerControlProps } from "./components/PlayerControl";
export { Fastboard, ReplayFastboard } from "./components/Fastboard";
export type { FastboardProps, ReplayFastboardProps } from "./components/Fastboard";

export * from "./helpers";
export * from "./behaviors";

import "./style.scss";
