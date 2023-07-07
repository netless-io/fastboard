import type { Instance, Props } from "tippy.js";
import type { SvelteAction } from "../typings";

import Tippy from "tippy.js";

if (typeof window !== "undefined") {
  Tippy.setDefaultProps({
    delay: [1000, 400],
    duration: 300,
    offset: [0, 11],
    theme: "dark",
    plugins: [
      {
        name: "className",
        defaultValue: "",
        fn(instance) {
          function add() {
            const el = instance.popper.firstElementChild;
            if (el) {
              el.classList.add("fastboard-tip");
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const extra = ((instance.props as any).className || "").trim();
              if (extra) {
                el.classList.add(extra);
              }
            }
          }

          function remove() {
            instance.popper.firstElementChild?.classList.remove("fastboard-tip");
          }

          return {
            onCreate: add,
            onBeforeUpdate: remove,
            onAfterUpdate: add,
          };
        },
      },
    ],
  });
}

export const tippy: SvelteAction<Partial<Props & { className: string }>> = function (node, props) {
  const instance = Tippy(node, props);

  return {
    update(props: Partial<Props & { className: string }>) {
      instance.setProps(props);
    },
    destroy() {
      instance.destroy();
    },
  };
};

export function tippy_hide_all() {
  document.querySelectorAll("[data-tippy-root]").forEach(el => {
    const instance = (el as unknown as { _tippy: Instance })._tippy;
    if (instance) instance.hide();
  });
}

export const tippy_menu: Partial<Props> = {
  delay: 0,
  duration: [50, 300],
  placement: "right-start",
  interactive: true,
  trigger: "click",
};
