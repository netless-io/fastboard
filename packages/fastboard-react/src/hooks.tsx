import type { SvelteComponent as SvelteComponentType } from "svelte";
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

export function wrapReactComponent<Props>(
  SvelteComponent: typeof SvelteComponentType,
  name: string
): FunctionComponent<Props> {
  function ReactComponent(props: Props) {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const component = useRef<SvelteComponentType | null>(null);

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

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fastboard;
}

export function useReplayFastboard(config: () => FastboardReplayOptions): FastboardPlayer | null {
  const unmountRef = useRef(false);
  const [fastboard, setFastboard] = useState<FastboardPlayer | null>(null);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fastboard;
}
