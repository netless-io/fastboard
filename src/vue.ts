import type { ComponentPublicInstance, Ref } from "vue-demi";
import {
  computed,
  getCurrentScope,
  onScopeDispose,
  shallowRef,
  unref,
  watchEffect,
} from "vue-demi";
import { createWhiteboardApp } from "./index";

import type { WhiteboardApp, WhiteboardAppConfig } from "./WhiteboardApp";

export type FastBoardConfig = WhiteboardAppConfig;

export type MaybeRef<T> = T | Ref<T>;
export type VueInstance = ComponentPublicInstance;
export type MaybeElementRef = MaybeRef<
  HTMLElement | SVGElement | VueInstance | undefined | null
>;

/**
 * Get the dom element of a ref of element or Vue component instance
 */
export function unrefElement(elRef: MaybeElementRef) {
  const plain = unref(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}

function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

/**
 * @example
 * ```vue
 * <script setup>
 * const el = ref(null)
 * const app = useFastboard(el, { sdkConfig, joinRoom })
 * if (app.value) {
 *   app.value.insertDocs({...})
 * }
 * </script>
 * <template>
 *   <div style="width: 100%; height: 100%" ref="el"></div>
 * </template>
 * ```
 */
export function useFastboard(el: MaybeElementRef, config: FastBoardConfig) {
  const app = shallowRef<WhiteboardApp | null>(null);
  const target = computed(() => unrefElement(el));

  createWhiteboardApp(config).then(app_ => {
    app.value = app_;
  });

  watchEffect(() => {
    if (target.value && app.value) {
      app.value.bindElement(target.value);
    }
  });

  tryOnScopeDispose(() => {
    if (app.value) {
      app.value.dispose();
    }
  });

  return app;
}
