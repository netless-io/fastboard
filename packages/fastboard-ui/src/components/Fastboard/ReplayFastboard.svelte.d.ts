import type { FastboardPlayer } from "@netless/fastboard-core";
import type { Theme, Language, ReplayFastboardUIConfig } from "../../typings";
import { SvelteComponentTyped } from "../../typings";

export declare interface ReplayFastboardProps {
  player?: FastboardPlayer | null;
  theme?: Theme;
  language?: Language;
  containerRef?: (container: HTMLDivElement | null) => void;
  config?: ReplayFastboardUIConfig;
}

declare class ReplayFastboard extends SvelteComponentTyped<ReplayFastboardProps> {}
export default ReplayFastboard;
