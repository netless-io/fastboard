import type { Size } from "white-web-sdk";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export interface HandlerProps {
  target: HTMLDivElement;
  defaultSize: Size;
}

export function Handler({ target, defaultSize }: HandlerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [saved, save] = useState({
    x: 0,
    y: 0,
    width: defaultSize.width,
    height: defaultSize.height,
  });
  const [width, setWidth] = useState(defaultSize.width);
  const [height, setHeight] = useState(defaultSize.height);

  useEffect(() => {
    setOffset(target.getBoundingClientRect());
  }, [target]);

  useEffect(() => {
    Object.assign(target.style, { width: `${width}px`, height: `${height}px` });
  }, [height, target, width]);

  const onPointerDown = useCallback(
    (ev: PointerEvent) => {
      if (ev.target === ref.current) {
        save({ x: ev.x, y: ev.y, width, height });
        setActive(true);
      }
    },
    [height, width]
  );

  const onPointerMove = useCallback(
    (ev: PointerEvent) => {
      if (active) {
        const dx = ev.clientX - saved.x;
        const dy = ev.clientY - saved.y;
        setWidth(Math.max(saved.width + dx, 8));
        setHeight(Math.max(saved.height + dy, 8));
      }
    },
    [active, saved]
  );

  const onPointerUp = useCallback(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  return createPortal(
    <div
      ref={ref}
      className={clsx("draggable", { active })}
      style={{
        left: `${offset.x + width - 30}px`,
        top: `${offset.y + height - 30}px`,
      }}
    />,
    document.querySelector("#portal") as HTMLDivElement
  );
}
