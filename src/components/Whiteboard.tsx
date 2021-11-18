import style from "@netless/window-manager/dist/style.css?inline";

import type { MountWhiteboardParams } from "../internal";
import type { WhiteboardApp } from "../internal/App";

import React, { useCallback, useEffect } from "react";
import { classNames, injectStyle } from "../helpers/utils";
import { mountWhiteboard } from "../internal";

export type WhiteboardProps = MountWhiteboardParams & {
  instance: WhiteboardApp;
};

export function Whiteboard({ instance, ...params }: WhiteboardProps) {
  const useWhiteboard = useCallback(
    async (container: HTMLDivElement | null) => {
      if (container) {
        const essentials = await mountWhiteboard(params, container);
        Object.assign(instance, essentials);
      } else {
        const { room } = instance;
        room && room.disconnect();
      }
    },
    [instance, params]
  );

  useEffect(() => {
    const styleElement = injectStyle(style);
    return () => {
      styleElement && document.head.removeChild(styleElement);
    };
  }, []);

  return <div className={classNames("main")} ref={useWhiteboard}></div>;
}
