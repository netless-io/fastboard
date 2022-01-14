import clsx from "clsx";
import { memo, useCallback, useEffect, useRef, useState } from "preact/compat";

import { useInstance, clamp } from "../../internal";
import { name } from "./Toolbar";
import { ItemHeight, ItemsCount, MaxHeight, MinHeight } from "./const";
import { DownButton, UpButton } from "./components/UpDownButtons";
import {
  CleanButton,
  ClickerButton,
  EraserButton,
  SelectorButton,
} from "./components/ApplianceButtons";
import { AppsButton } from "./components/AppsButton";
import { PencilButton } from "./components/PencilButton";
import { TextButton } from "./components/TextButton";
import { ShapesButton } from "./components/ShapesButton";

export const Content = memo(() => {
  const app = useInstance();
  const ref = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const hasAppButton = app?.config.toolbar?.apps?.enable ?? true;
  const needScroll = parentHeight < ItemHeight * ItemsCount + 48;
  const sectionHeight = clamp(
    parentHeight - 48 * (needScroll ? 3 : 1),
    MinHeight,
    MaxHeight
  );
  const scrollBuffer = Math.max(parentHeight - sectionHeight - 1, 0);
  const disableScrollUp = scrollTop === 0;
  const disableScrollDown = scrollTop === scrollBuffer;

  const scrollTo = useCallback(
    (height: number) => {
      setScrollTop(clamp(scrollTop + height, 0, scrollBuffer));
    },
    [scrollBuffer, scrollTop]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  useEffect(() => {
    const container = ref.current?.parentElement?.parentElement;
    if (container) {
      const { paddingTop, paddingBottom } = getComputedStyle(container);
      const padding = parseInt(paddingTop) + parseInt(paddingBottom) || 0;
      const resizeObserver = new ResizeObserver(() => {
        setParentHeight(container.getBoundingClientRect().height - padding);
      });
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <>
      {needScroll && (
        <UpButton scrollTo={scrollTo} disabled={disableScrollUp} />
      )}
      <div
        ref={ref}
        className={clsx(`${name}-section`)}
        style={{
          height: `${sectionHeight}px`,
          overflow: needScroll ? "hidden" : "visible",
        }}
      >
        <ClickerButton />
        <SelectorButton />
        <PencilButton />
        <TextButton />
        <ShapesButton />
        <EraserButton />
        <CleanButton />
        {hasAppButton && (
          <AppsButton
            content={app?.config.toolbar?.apps?.content}
            onClick={app?.config.toolbar?.apps?.onClick}
          />
        )}
      </div>
      {needScroll && (
        <DownButton scrollTo={scrollTo} disabled={disableScrollDown} />
      )}
    </>
  );
});
