import clsx from "clsx";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "../../icons";

import { clamp } from "../../internal";
import { CleanButton, ClickerButton, EraserButton, SelectorButton } from "./components/ApplianceButtons";
import { AppsButton } from "./components/AppsButton";
import { PencilButton } from "./components/PencilButton";
import { ShapesButton } from "./components/ShapesButton";
import { TextButton } from "./components/TextButton";
import { DownButton, UpButton } from "./components/UpDownButtons";
import { ItemHeight, ItemsCount, MaxHeight, MinHeight } from "./const";
import { name, ToolbarContext } from "./Toolbar";

import collapsePNG from "./components/assets/collapsed.png";

export interface ContextProps {
  onCollapse: () => void;
}

export function Content({ onCollapse }: ContextProps) {
  const { theme, icons, writable } = useContext(ToolbarContext);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const disabled = !writable;

  const needScroll = parentHeight < ItemHeight * ItemsCount + 48;
  const sectionHeight = clamp(parentHeight - 48 * (needScroll ? 3 : 1), MinHeight, MaxHeight);
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
      {needScroll && <UpButton scrollTo={scrollTo} disabled={disableScrollUp} />}
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
        <AppsButton />
      </div>
      {needScroll && <DownButton scrollTo={scrollTo} disabled={disableScrollDown} />}

      <div className="fastboard-toolbar-mask" onClick={onCollapse}>
        <Icon
          fallback={<img draggable={false} className={clsx(`${name}-mask-btn`, theme)} src={collapsePNG} />}
          src={disabled ? icons?.expandIconDisable : icons?.expandIcon}
        />
      </div>
    </>
  );
}
