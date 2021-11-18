import type { MountWhiteboardParams, WhiteboardApp } from "../internal";

import React, { useCallback } from "react";
import { classNames } from "../helpers/utils";
import { mountWhiteboard } from "../internal";

export type WhiteboardProps = MountWhiteboardParams & {
  instance: WhiteboardApp;
  onMount?: () => void;
  onDestroy?: () => void;
};

export function Whiteboard({ instance, onMount, onDestroy, ...params }: WhiteboardProps) {
  const useWhiteboard = useCallback(async (container: HTMLDivElement | null) => {
    if (container) {
      const essentials = await mountWhiteboard(params, container);
      instance.accept(essentials);
      onMount && onMount();
    } else {
      const { room } = instance;
      room && room.disconnect();
      onDestroy && onDestroy();
    }
    // props will never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={classNames("main")} ref={useWhiteboard}></div>;
}
