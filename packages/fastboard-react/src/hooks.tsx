import type { SvelteComponent as SvelteComponentType } from "svelte";
import type { DependencyList, EffectCallback, FunctionComponent } from "react";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

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
