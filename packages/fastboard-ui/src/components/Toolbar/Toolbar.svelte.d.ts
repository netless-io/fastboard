import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language } from "../../typings";
import { SvelteComponentTyped } from "svelte";

export declare interface ToolbarProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
}

declare class Toolbar extends SvelteComponentTyped<ToolbarProps> {}
export default Toolbar;
