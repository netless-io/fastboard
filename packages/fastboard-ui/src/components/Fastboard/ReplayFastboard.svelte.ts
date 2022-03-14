import type { FastboardPlayer } from "@netless/fastboard-core";
import type { Theme, Language } from "../../typings";
import { SvelteComponentTyped } from "svelte";

export declare interface ReplayFastboardProps {
  player?: FastboardPlayer | null;
  theme?: Theme;
  language?: Language;
  ref?: (container: HTMLElement) => void;
}

declare class ReplayFastboard extends SvelteComponentTyped<ReplayFastboardProps> {}
export default ReplayFastboard;
