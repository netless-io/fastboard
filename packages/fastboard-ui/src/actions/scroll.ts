import type { Writable } from "svelte/store";
import type { SvelteAction } from "../typings";

export const scrollTop: SvelteAction<Writable<number>> = function (node, value) {
  const listener = (top: number) => {
    node.scrollTo({ top, behavior: "smooth" });
  };

  let timer = 0;

  function on_scroll() {
    clearTimeout(timer);
    timer = setTimeout(() => value.set(node.scrollTop), 200);
  }

  node.addEventListener("scroll", on_scroll);

  let unsubscribe = value.subscribe(listener);

  return {
    update(new_value) {
      unsubscribe();
      unsubscribe = (value = new_value).subscribe(listener);
    },
    destroy() {
      clearTimeout(timer);
      node.removeEventListener("scroll", on_scroll);
      unsubscribe();
    },
  };
};
