import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language, GenericIcon } from "../../typings";
import { SvelteComponentTyped } from "../../typings";

export declare interface ZoomControlProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  icons?: GenericIcon<"plus" | "minus" | "reset">;
}

declare class ZoomControl extends SvelteComponentTyped<ZoomControlProps> {}
export default ZoomControl;
