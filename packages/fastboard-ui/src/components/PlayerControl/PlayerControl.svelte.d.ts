import type { FastboardPlayer } from "@netless/fastboard-core";
import type { Theme, Language, GenericIcon } from "../../typings";
import { SvelteComponentTyped } from "svelte";

export declare interface PlayerControlProps {
  player?: FastboardPlayer | null;
  theme?: Theme;
  language?: Language;
  icons?: GenericIcon<"play" | "pause" | "loading">;
}

declare class PlayerControl extends SvelteComponentTyped<PlayerControlProps> {}
export default PlayerControl;
