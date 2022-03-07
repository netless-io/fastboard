import type { Instance } from "tippy.js";
import tippy from "tippy.js";

export const instances = new Set<Instance>();

export function onCreate(instance: Instance) {
  instances.add(instance);
}

export function onDestroy(instance: Instance) {
  instances.delete(instance);
}

tippy.setDefaultProps({ onCreate, onDestroy });

export function hideAll() {
  instances.forEach(instance => instance.hide());
}
