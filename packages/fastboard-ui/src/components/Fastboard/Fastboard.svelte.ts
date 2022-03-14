import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language } from "../../typings";
import { SvelteComponentTyped } from "svelte";

export declare interface FastboardProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  containerRef?: (container: HTMLDivElement | null) => void;
}

declare class Fastboard extends SvelteComponentTyped<FastboardProps> {}
export default Fastboard;
