import type { Instance } from "tippy.js";

export function hideAll() {
  Array.from(document.querySelectorAll("[data-tippy-root]")).forEach(e => {
    const instance = (e as unknown as { _tippy?: Instance })._tippy;
    if (instance) instance.hide();
  });
}
