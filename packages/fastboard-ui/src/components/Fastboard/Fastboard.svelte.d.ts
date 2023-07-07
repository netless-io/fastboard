import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language, FastboardUIConfig } from "../../typings";
import { SvelteComponentTyped } from "../../typings";

export declare interface FastboardProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  containerRef?: (container: HTMLDivElement | null) => void;
  config?: FastboardUIConfig;
}

declare class Fastboard extends SvelteComponentTyped<FastboardProps> {}
export default Fastboard;
