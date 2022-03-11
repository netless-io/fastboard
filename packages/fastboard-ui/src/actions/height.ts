import type { Writable } from "svelte/store";
import type { SvelteAction } from "../typings";

export const height: SvelteAction<Writable<number>> = function (node, height) {
  const styles = getComputedStyle(node);
  const paddings =
    (parseInt(styles.paddingTop) || 0) +
    (parseInt(styles.paddingBottom) || 0) +
    (parseInt(styles.borderTopWidth) || 0) +
    (parseInt(styles.borderBottomWidth) || 0);

  const observer = new ResizeObserver(() => {
    height.set(node.getBoundingClientRect().height - paddings);
  });

  observer.observe(node);

  return {
    update(new_height) {
      height = new_height;
    },
    destroy() {
      observer.disconnect();
    },
  };
};

export const scrollHeight: SvelteAction<Writable<number>> = function (node, height) {
  const observer = new ResizeObserver(() => {
    height.set(node.scrollHeight);
  });

  observer.observe(node);

  return {
    update(new_height) {
      height = new_height;
    },
    destroy() {
      observer.disconnect();
    },
  };
};
