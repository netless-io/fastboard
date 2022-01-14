/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TippyProps as _TippyProps } from "@tippyjs/react";
import type { Instance, Props } from "tippy.js";
import type { VNode } from "preact";
import { cloneElement } from "preact";

import { useEffect, useRef, useState } from "preact/hooks";
import tippy from "tippy.js";

import { isBrowser } from "../../internal";
import { createPortal } from "preact/compat";

export type TippyProps = Omit<
  _TippyProps,
  "children" | "content" | "render"
> & {
  children?: VNode;
  content?: VNode;
  __source?: any;
  __self?: any;
};

function updateClassName(
  box: Element | null,
  action: "add" | "remove",
  classNames: string
) {
  classNames.split(/\s+/).forEach(name => {
    if (name && box) {
      box.classList[action](name);
    }
  });
}

const classNamePlugin = {
  name: "className",
  defaultValue: "",
  fn(instance: Instance) {
    const box = instance.popper.firstElementChild;

    function add() {
      updateClassName(box, "add", (instance.props as any).className);
    }

    function remove() {
      updateClassName(box, "remove", (instance.props as any).className);
    }

    return {
      onCreate: add,
      onBeforeUpdate: remove,
      onAfterUpdate: add,
    };
  },
};

// re-implement https://github.com/atomiks/tippyjs-react for preact
// license: MIT
export function Tippy({
  children,
  content,
  visible,
  disabled = false,
  ignoreAttributes = true,
  __source,
  __self,
  ...restProps
}: TippyProps) {
  const isControlledMode = visible !== undefined;

  const [mounted, setMounted] = useState(false);
  const mutableBox = useMutableBox<{
    instance?: Instance;
    container: HTMLDivElement;
    renders: number;
    ref?: HTMLDivElement | null;
  }>(() => ({
    container: ssrSafeCreateDiv(),
    renders: 1,
  }));

  const props = {
    ignoreAttributes,
    ...restProps,
    content: mutableBox.container,
  };

  if (isControlledMode) {
    if (process.env.NODE_ENV !== "production") {
      ["trigger", "hideOnClick", "showOnCreate"].forEach(nativeStateProp => {
        if ((props as any)[nativeStateProp] !== "undefined") {
          console.warn(
            [
              `@tippyjs/react: Cannot specify \`${nativeStateProp}\` prop in`,
              `controlled mode (\`visible\` prop)`,
            ].join(" ")
          );
        }
      });
    }

    props.trigger = "manual";
    props.hideOnClick = false;
  }

  const computedProps = props as unknown as Props;

  const deps = [children ? children.type : null].filter(Boolean);

  // CREATE
  useEffect(() => {
    const instance = tippy(mutableBox.ref || ssrSafeCreateDiv(), {
      ...computedProps,
      plugins: [classNamePlugin, ...(props.plugins || [])],
    });

    mutableBox.instance = instance;

    if (disabled) {
      instance.disable();
    }

    if (visible) {
      instance.show();
    }

    setMounted(true);

    return () => {
      instance.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // UPDATE
  useEffect(() => {
    if (mutableBox.renders === 1) {
      mutableBox.renders++;
      return;
    }

    const { instance } = mutableBox;
    if (!instance) return;

    instance.setProps(deepPreserveProps(instance.props, computedProps));

    if (disabled) {
      instance.disable();
    } else {
      instance.enable();
    }

    if (isControlledMode) {
      if (visible) {
        instance.show();
      } else {
        instance.hide();
      }
    }
  });

  return (
    <>
      {children &&
        cloneElement(children, {
          ref(node: HTMLDivElement | null) {
            mutableBox.ref = node;
            preserveRef(children.ref, node || null);
          },
        })}
      {mounted && content && createPortal(content, mutableBox.container)}
    </>
  );
}

function ssrSafeCreateDiv() {
  return (isBrowser && document.createElement("div")) as HTMLDivElement;
}

function useMutableBox<T>(init: T | (() => T)): T {
  const ref = useRef<T>();

  if (!ref.current) {
    ref.current = typeof init === "function" ? (init as () => T)() : init;
  }

  return ref.current as T;
}

function deepPreserveProps(instanceProps: Props, componentProps: Props) {
  return {
    ...componentProps,
    popperOptions: {
      ...instanceProps.popperOptions,
      ...componentProps.popperOptions,
      modifiers: uniqueByShape([
        ...(instanceProps.popperOptions?.modifiers || []),
        ...(componentProps.popperOptions?.modifiers || []),
      ]),
    },
  };
}

function uniqueByShape<T>(arr: Array<T>) {
  const output: T[] = [];

  arr.forEach(item => {
    if (!output.find(outputItem => deepEqual(item, outputItem))) {
      output.push(item);
    }
  });

  return output;
}

function deepEqual(x: any, y: any): boolean {
  if (x === y) {
    return true;
  } else if (
    typeof x === "object" &&
    x != null &&
    typeof y === "object" &&
    y != null
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }

    for (const prop in x) {
      if (Object.prototype.hasOwnProperty.call(y, prop)) {
        if (!deepEqual(x[prop], y[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

function preserveRef(ref: any, node: HTMLDivElement | null) {
  if (ref) {
    if (typeof ref === "function") {
      ref(node);
    }
    if (Object.prototype.hasOwnProperty.call(ref, "current")) {
      ref.current = node;
    }
  }
}
