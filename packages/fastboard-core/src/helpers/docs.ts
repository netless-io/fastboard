import type { FastboardApp, WindowManager } from "../impl";

export type DocsEvent = "prevPage" | "nextPage" | "prevStep" | "nextStep" | "jumpToPage" | "scalePage";

export interface DocsEventOptions {
  /** If provided, will dispatch to the specific app. Default to the focused app. */
  appId?: string;
  /** Used by `jumpToPage` event, range from 1 to total pages count. */
  page?: number;
  /** Used by `scalePage` event. Range from 1 to 4, decimals allowed. `1` means default fitted size. */
  scale?: number;
}

type DocsEventManager = WindowManager & {
  dispatchDocsEvent?: (event: DocsEvent, options?: DocsEventOptions) => boolean;
};

/**
 * Send specific command to the DocsViewer / Presentation / Slide app.
 * This is a compatibility wrapper around `WindowManager.dispatchDocsEvent()`.
 *
 * Returns false if failed to find the app or not writable.
 *
 * For DocsViewer and Presentation, `nextPage` equals to `nextStep`, as with
 * `prevPage` and `prevStep`.
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
  event: DocsEvent,
  options: DocsEventOptions = {}
): boolean {
  const manager = "manager" in fastboard ? fastboard.manager : fastboard;
  const dispatchDocsEvent = (manager as DocsEventManager).dispatchDocsEvent;
  if (!dispatchDocsEvent) {
    console.warn("window manager does not support dispatchDocsEvent");
    return false;
  }
  return dispatchDocsEvent.call(manager, event, options);
}
