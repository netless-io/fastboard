import type { MountWhiteboardParams, WhiteboardApp } from "../internal";

import React, { useCallback } from "react";

import { classNames } from "../helpers/utils";
import { EMPTY_ARRAY, mountWhiteboard } from "../internal";

export type WhiteboardProps = MountWhiteboardParams & {
  instance: WhiteboardApp;
};

export function Whiteboard({ instance, ...params }: WhiteboardProps) {
  const useWhiteboard = useCallback(async (container: HTMLDivElement | null) => {
    if (container) {
      instance.accept(await mountWhiteboard(params, container));
    } else {
      instance.room && instance.room.disconnect();
    }
    // props will never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, EMPTY_ARRAY);

  return <div className={classNames("main")} ref={useWhiteboard}></div>;
}
