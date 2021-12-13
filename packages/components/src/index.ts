import RedoUndo from "./components/RedoUndo.svelte";
import ZoomControl from "./components/ZoomControl.svelte";
import PageControl from "./components/PageControl.svelte";
import version from "./version";

export type {
  CommonProps,
  Icon,
  IconType,
  RedoUndoProps,
  ZoomControlProps,
  PageControlProps,
  Theme,
} from "./types";

export { version, RedoUndo, ZoomControl, PageControl };
