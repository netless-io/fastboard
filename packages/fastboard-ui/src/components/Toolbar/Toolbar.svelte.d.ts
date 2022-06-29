import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language } from "../../typings";
import { SvelteComponentTyped } from "svelte";

export declare interface ToolbarConfig {
  apps?: {
    enable?: boolean;
  };
  eraser?: {
    /**
     * - delete: remove shapes under eraser
     * - pencil: wipe out part of strokes under eraser, like a real eraser
     * - both (default): will show a panel to choose different behavior
     */
    behavior?: "delete" | "pencil" | "both";
  };
}

export declare interface ToolbarProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  config?: ToolbarConfig;
}

declare class Toolbar extends SvelteComponentTyped<ToolbarProps> {}
export default Toolbar;
