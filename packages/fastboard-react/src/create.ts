import type { FastboardApp, FastboardOptions } from "@netless/fastboard-core";

import { createFastboardCore } from "@netless/fastboard-core";
import { registerDefaultApps, registerSlide } from "./behaviors/netless-app";

/**
 * Create a FastboardApp instance.
 * @example
 * let app = await createFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *     region: 'cn-hz',
 *   },
 *   joinRoom: {
 *     uid: unique_id,
 *     uuid: import.meta.env.VITE_ROOM_UUID,
 *     roomToken: import.meta.env.VITE_ROOM_TOKEN,
 *   },
 * })
 */
export async function createFastboard<TEventData extends Record<string, any> = any>(
  options: FastboardOptions
): Promise<FastboardApp<TEventData>> {
  registerSlide();
  registerDefaultApps();
  return createFastboardCore<TEventData>(options);
}
