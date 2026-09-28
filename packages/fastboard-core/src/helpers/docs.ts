import type { FastboardApp, WindowManager } from "../impl";
import type { DocsEvent, DocsEventOptions, DispatchDocsEventResult } from "@netless/window-manager";

export type {
  DocsEvent,
  DocsEventOptions,
  DispatchDocsEventFailureReason,
  DispatchDocsEventResult,
} from "@netless/window-manager";

type DocsEventManager = WindowManager & {
  dispatchDocsEvent?: (event: DocsEvent, options?: DocsEventOptions) => Promise<DispatchDocsEventResult>;
};

/**
 * Send a page or scale command to mainView, DocsViewer, Presentation, or Slide.
 * This is a wrapper around `WindowManager.dispatchDocsEvent()`.
 *
 * The Promise resolves to a structured acceptance result. Observe
 * `unifiedPageStateChange` for the actual page or relative scale.
 *
 * @example
 * ```js
 * // send "next page" to the focused app
 * await dispatchDocsEvent(fastboard, "nextPage")
 *
 * // send "prev page" to a concrete app
 * await dispatchDocsEvent(fastboard, "prevPage", { target: "Slide-1a2b3c4d" })
 * ```
 */
export function dispatchDocsEvent(
  fastboard: FastboardApp | WindowManager,
  event: DocsEvent,
  options: DocsEventOptions = {}
): Promise<DispatchDocsEventResult> {
  const manager = "manager" in fastboard ? fastboard.manager : fastboard;
  const dispatchDocsEvent = (manager as DocsEventManager).dispatchDocsEvent;
  if (!dispatchDocsEvent) {
    console.warn("window manager does not support dispatchDocsEvent");
    return Promise.resolve({
      accepted: false,
      reason: "targetNotSupported",
      message: "window manager does not support dispatchDocsEvent",
    });
  }
  return dispatchDocsEvent.call(manager, event, options);
}
