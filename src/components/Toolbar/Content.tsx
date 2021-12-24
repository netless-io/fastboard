import React, { useCallback, useEffect, useRef, useState } from "react";

import { clamp } from "../../helpers";
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

export interface ContentProps {
  padding?: number;
  appsContent?: React.ReactNode;
  onClickApps?: () => void;
}

export function Content({
  padding = 16,
  appsContent,
  onClickApps,
}: ContentProps) {
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
        <AppsButton content={appsContent} onClick={onClickApps} />
      </div>
      {needScroll && <DownButton scrollTo={scrollTo} />}
    </>
  );
}
