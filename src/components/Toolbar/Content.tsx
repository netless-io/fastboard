import React, { useCallback, useEffect, useRef, useState } from "react";

import { clamp } from "../../helpers";
import { name } from "./Toolbar";
import { ItemHeight, ItemsCount, MaxHeight, MinHeight } from "./const";
import { DownButton, UpButton } from "./components/UpDownButtons";
import { ClickerButton, SelectorButton } from "./components/ApplianceButtons";
import { PencilButton } from "./components/PencilButton";

export interface ContentProps {
  padding?: number;
}

export function Content({ padding = 16 }: ContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState(0);

  const needScroll = parentHeight < ItemHeight * ItemsCount + 48;
  const sectionHeight = clamp(
    parentHeight - 48 * (needScroll ? 3 : 1),
    MinHeight,
    MaxHeight
  );

  const scrollTo = useCallback((height: number) => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollTop + height;
    }
  }, []);

  useEffect(() => {
    const container = ref.current?.parentElement?.parentElement;
    if (container) {
      const resizeObserver = new ResizeObserver(() => {
        setParentHeight(container.getBoundingClientRect().height - padding * 2);
      });
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }
  }, [padding]);

  return (
    <>
      {needScroll && <UpButton scrollTo={scrollTo} />}
      <div
        ref={ref}
        className={`${name}-section`}
        style={{ height: `${sectionHeight}px` }}
      >
        <ClickerButton />
        <SelectorButton />
        <PencilButton />
      </div>
      {needScroll && <DownButton scrollTo={scrollTo} />}
    </>
  );
}
