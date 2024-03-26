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
}

declare class Fastboard extends SvelteComponentTyped<FastboardProps> {}
export default Fastboard;
