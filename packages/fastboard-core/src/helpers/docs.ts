import type { AppResult } from "@netless/app-slide";
import type { FastboardApp, WindowManager } from "../impl";

export interface DocsEventOptions {
  /** If provided, will dispatch to the specific app. Default to the focused app. */
  appId?: string;
  /** Used by `jumpToPage` event, range from 1 to total pages count. */
  page?: number;
}

/**
 * Send specific command to the static docs / slide app.
 * Only works for apps that were created by `insertDocs()`.
 *
 * Returns false if failed to find the app or not writable.
 *
 * For static docs, `nextPage` equals to `nextStep`, as with `prevPage` and `prevStep`.
 *
 * @example
 * ```js
 * // send "next page" to the focused app
 * dispatchDocsEvent(fastboard, "nextPage")
 *
 * // send "prev page" to some app
 * dispatchDocsEvent(fastboard, "prevPage", {appId:"Slide-1a2b3c4d"})
 * ```
 */
export function dispatchDocsEvent(
  fastboard: FastboardApp | WindowManager,
  event: "prevPage" | "nextPage" | "prevStep" | "nextStep" | "jumpToPage",
  options: DocsEventOptions = {}
): boolean {
  const manager = "manager" in fastboard ? fastboard.manager : fastboard;

  const appId = options.appId || manager.focused;
  if (!appId) {
    console.warn("not found " + (options.appId || "focused app"));
    return false;
  }

  let page: number | undefined, input: HTMLInputElement | null;

  // Click the DOM elements for static docs
  if (appId.startsWith("DocsViewer-")) {
    const dom = manager.queryOne(appId)?.box?.$footer;
    if (!dom) {
      console.warn("not found app with id " + appId);
      return false;
    }

    const click = (el: Element | null) => {
      el && el.dispatchEvent(new MouseEvent("click"));
    };

    switch (event) {
      case "prevPage":
      case "prevStep":
        click(dom.querySelector('button[class$="btn-page-back"]'));
        break;
      case "nextPage":
      case "nextStep":
        click(dom.querySelector('button[class$="btn-page-next"]'));
        break;
      case "jumpToPage":
        page = options.page;
        input = dom.querySelector('input[class$="page-number-input"]');
        if (!input || typeof page !== "number") {
          console.warn("failed to jump" + (page ? " to page " + page : ""));
          return false;
        }
        input.value = "" + page;
        input.dispatchEvent(new InputEvent("change"));
        break;
      default:
        console.warn("unknown event " + event);
        return false;
    }

    return true;
  }

  // Check controller for slide docs
  else if (appId.startsWith("Slide-")) {
    const app = manager.queryOne(appId)?.appResult as unknown as AppResult | undefined;
    if (!app) {
      console.warn("not found app with id " + appId);
      return false;
    }

    switch (event) {
      case "prevPage":
        return app.prevPage();
      case "nextPage":
        return app.nextPage();
      case "prevStep":
        return app.prevStep();
      case "nextStep":
        return app.nextStep();
      case "jumpToPage":
        page = options.page;
        if (typeof page !== "number") {
          console.warn("failed to jump" + (page ? " to page " + page : ""));
          return false;
        }
        return app.jumpToPage(page);
      default:
        console.warn("unknown event " + event);
        return false;
    }
  }

  // No support for any other kind
  else {
    console.warn("not supported app " + appId);
    return false;
  }
}
