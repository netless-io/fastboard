import type { FastboardPlayer, FastboardReplayOptions } from "@netless/fastboard-core";

import { replayFastboardCore } from "@netless/fastboard-core";
import { registerDefaultApps, registerSlide } from "./behaviors/netless-app";

/**
 * Create a FastboardPlayer instance.
 * @example
 * let player = await replayFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *     region: 'cn-hz',
 *   },
 *   replayRoom: {
 *     room: "room uuid",
 *     roomToken: "NETLESSROOM_...",
 *     beginTimestamp: 1646619090394,
 *     duration: 70448,
 *   },
 * })
 */
export async function replayFastboard<TEventData extends Record<string, any> = any>(
  options: FastboardReplayOptions
): Promise<FastboardPlayer<TEventData>> {
  registerSlide();
  registerDefaultApps();
  return replayFastboardCore<TEventData>(options);
}
