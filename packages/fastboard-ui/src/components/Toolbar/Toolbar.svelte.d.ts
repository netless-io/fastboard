import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language, ToolbarConfig } from "../../typings";
import { SvelteComponentTyped } from "svelte";

export declare interface ToolbarProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  config?: ToolbarConfig;
}

declare class Toolbar extends SvelteComponentTyped<ToolbarProps> {}
export default Toolbar;
