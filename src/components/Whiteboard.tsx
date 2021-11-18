import type { MountWhiteboardParams, WhiteboardApp } from "../internal";

import style from "@netless/window-manager/dist/style.css?inline";
import React, { useCallback } from "react";
import { classNames } from "../helpers/utils";
import { mountWhiteboard, useStyleLoader } from "../internal";

export type WhiteboardProps = MountWhiteboardParams & {
  instance: WhiteboardApp;
};

export function Whiteboard({ instance, ...params }: WhiteboardProps) {
  useStyleLoader(style);

  const useWhiteboard = useCallback(async (container: HTMLDivElement | null) => {
    if (container) {
      const essentials = await mountWhiteboard(params, container);
      Object.assign(instance, essentials);
    } else {
      const { room } = instance;
      room && room.disconnect();
    }
    // props will never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={classNames("main")} ref={useWhiteboard}></div>;
}
