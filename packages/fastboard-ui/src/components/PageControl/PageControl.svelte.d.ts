import type { FastboardApp } from "@netless/fastboard-core";
import type { Theme, Language, GenericIcon, SvelteComponentTyped } from "../../typings";

export declare interface PageControlProps {
  app?: FastboardApp | null;
  theme?: Theme;
  language?: Language;
  icons?: GenericIcon<"prev" | "next" | "add">;
}

declare class PageControl extends SvelteComponentTyped<PageControlProps> {}
export default PageControl;
