import style from "@netless/window-manager/dist/style.css?inline";

import React, { useCallback, useEffect } from "react";
import { classNames, injectStyle } from "../helpers/utils";
import { mountWhiteboard } from "../internal";
import { WhiteboardApp } from "..";

export interface WhiteboardProps {
  appIdentifier: string;
  joinRoom: {
    uid: string;
    uuid: string;
    roomToken: string;
  };
  instance: WhiteboardApp;
}

export function Whiteboard(props: WhiteboardProps) {
  const useWhiteboard = useCallback(
    async (container: HTMLDivElement | null) => {
      if (container) {
        const essentials = await mountWhiteboard(props, container);
        Object.assign(props.instance, essentials);
      } else {
        const { room } = props.instance;
        room && room.disconnect();
      }
    },
    [props, props.instance]
  );

  useEffect(() => {
    const styleElement = injectStyle(style);
    return () => {
      styleElement && document.head.removeChild(styleElement);
    };
  }, []);

  return <div className={classNames("main")} ref={useWhiteboard}></div>;
}
