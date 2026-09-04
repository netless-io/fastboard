import type { FastboardApp, WindowManager } from "../impl";

export type DocsEvent = "prevPage" | "nextPage" | "prevStep" | "nextStep" | "jumpToPage" | "scalePage";

export interface DocsEventOptions {
  /** `mainView` or a concrete appId. Defaults to the focused app, then mainView. */
  target?: string;
  /** @deprecated Use `target` instead. */
  appId?: string;
  /** Used by `jumpToPage` event, range from 1 to total pages count. */
  page?: number;
  /** Used by `scalePage`. Relative to fitted size; `1` means fitted size. */
  scale?: number;
}

export type DispatchDocsEventFailureReason =
  | "invalidEvent"
  | "invalidOptions"
  | "targetNotFound"
  | "targetNotSupported"
  | "eventNotSupported"
  | "notWritable"
  | "stateUnavailable"
  | "outOfRange"
  | "commandFailed";

export type DispatchDocsEventResult =
  | { accepted: true }
  | {
      accepted: false;
      reason: DispatchDocsEventFailureReason;
      message: string;
    };

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
