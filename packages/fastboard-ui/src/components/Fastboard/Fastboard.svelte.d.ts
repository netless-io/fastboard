import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language, FastboardUIConfig } from "../../typings";
import { SvelteComponentTyped } from "../../typings";

export declare interface FastboardProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  /**
   * Note: updating this option does not take effect when the element was mounted.
   * Make sure to set this option in `UI.mount(div, { containerRef })`.
   */
  containerRef?: (container: HTMLDivElement | null) => void;
  config?: FastboardUIConfig;
  /** Whether to forcibly display the toolbar */
  force_show_toolbar?: boolean;
  /** Whether to force the display of the redo undo button */
  force_show_redo_undo?: boolean;
  /** Whether to force the display of the zoom control button */
  force_show_zoom_control?: boolean;
  /** Whether to forcibly display the page control button */
  force_show_page_control?: boolean;
}

declare class Fastboard extends SvelteComponentTyped<FastboardProps> {}
export default Fastboard;
