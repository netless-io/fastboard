import type { SvelteComponentTyped } from "@netless/fastboard-ui";
import type { DependencyList, EffectCallback, FunctionComponent } from "react";
import type {
  FastboardApp,
  FastboardOptions,
  FastboardPlayer,
  FastboardReplayOptions,
} from "@netless/fastboard-core";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createFastboard, replayFastboard } from "@netless/fastboard-core";

export const useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    return effect();
  }, deps);
}

// https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
export function useEffectOnce(effect: EffectCallback) {
  const effectFn = useRef(effect);
  const destroyFn = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const rendered = useRef(false);
  const [, refresh] = useState(0);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current();
      effectCalled.current = true;
    }

    refresh(1);

    return () => {
      if (rendered.current === false) {
        console.warn(
          "It seems you're under React.StrictMode, which could lead to unintended behavior. It is recommended to turn off it."
        );
        return;
      }
      if (destroyFn.current) destroyFn.current();
    };
  }, []);
}

export function wrapReactComponent<Props extends Record<string, any> | undefined>(
  SvelteComponent: typeof SvelteComponentTyped,
  name: string
): FunctionComponent<Props> {
  function ReactComponent(props: Props) {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const component = useRef<SvelteComponentTyped | null>(null);

    useIsomorphicLayoutEffect(() => {
      if (container) {
        component.current = new SvelteComponent({ target: container, props });

        return () => {
          if (component.current) {
            component.current.$destroy();
          }
        };
      }
    }, [container]);

    useUpdateEffect(() => {
      if (component.current) {
        component.current.$set(props);
      }
    }, [props]);

    return <div className="fastboard-react-div" ref={setContainer} />;
  }

  ReactComponent.displayName = name;

  return ReactComponent;
}

export function useFastboard(config: () => FastboardOptions): FastboardApp | null {
  const unmountRef = useRef(false);
  const [fastboard, setFastboard] = useState<FastboardApp | null>(null);

  useEffectOnce(() => {
    let fastboard: FastboardApp | null = null;

    createFastboard(config()).then(app => {
      if (!unmountRef.current) {
        setFastboard((fastboard = app));
      } else {
        app.destroy();
      }
    });

    return () => {
      unmountRef.current = true;
      fastboard && fastboard.destroy();
    };
  });

  return fastboard;
}

export function useReplayFastboard(config: () => FastboardReplayOptions): FastboardPlayer | null {
  const unmountRef = useRef(false);
  const [fastboard, setFastboard] = useState<FastboardPlayer | null>(null);

  useEffectOnce(() => {
    let fastboard: FastboardPlayer | null = null;

    replayFastboard(config()).then(app => {
      if (!unmountRef.current) {
        setFastboard((fastboard = app));
      } else {
        app.destroy();
      }
    });

    return () => {
      unmountRef.current = true;
      fastboard && fastboard.destroy();
    };
  });

  return fastboard;
}
