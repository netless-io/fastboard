import { readable, type Readable } from "svelte/store";
import { createWhiteboardApp } from "./index";

import type { WhiteboardApp, WhiteboardAppConfig } from "./WhiteboardApp";

export type FastBoardConfig = WhiteboardAppConfig;

/**
 * @example
 * ```svelte
 * <script>
 *   let ref = writable(null)
 *   let app = useFastboard(ref, { sdkConfig, joinRoom })
 *   if (app) {
 *     app.insertDocs({...})
 *   }
 * </script>
 * <div style="width: 100%; height: 100%" bind:this={$ref} />
 * ```
 */
export function useFastboard(
  ref: Readable<HTMLElement | null>,
  config: FastBoardConfig
): Readable<WhiteboardApp | null> {
  return readable<WhiteboardApp | null>(null, set => {
    let app_: WhiteboardApp | null = null;

    createWhiteboardApp(config).then(app => {
      set((app_ = app));
    });

    const dispose = ref.subscribe(div => {
      if (div && app_) {
        app_.bindElement(div);
      }
    });

    return () => {
      dispose();
      if (app_) {
        app_.dispose();
      }
    };
  });
}
