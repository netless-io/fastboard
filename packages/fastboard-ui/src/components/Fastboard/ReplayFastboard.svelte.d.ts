import type { FastboardPlayer } from "@netless/fastboard-core";
import type { Language, ReplayFastboardUIConfig, Theme } from "../../typings";
import { SvelteComponentTyped } from "svelte";

export declare interface ReplayFastboardProps {
  player?: FastboardPlayer | null;
  theme?: Theme;
  language?: Language;
  config?: ReplayFastboardUIConfig;
  containerRef?: (container: HTMLDivElement | null) => void;
}

declare class ReplayFastboard extends SvelteComponentTyped<ReplayFastboardProps> {}
export default ReplayFastboard;
