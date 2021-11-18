import React, { useCallback, useEffect } from "react";
import { classNames, injectStyle } from "../helpers/utils";
import { mountWhiteboard } from "../internal";
import { WhiteboardApp } from "..";
import style from "@netless/window-manager/dist/style.css?inline";
import type { WhiteWebSdkConfiguration, JoinRoomParams } from "white-web-sdk";
import { MountParams } from "@netless/window-manager";

export type JoinRoom = Omit<JoinRoomParams, "useMultiViews" | "disableMagixEventDispatchLimit">;
export type WhiteWindowSDKConfiguration = Omit<WhiteWebSdkConfiguration, "useMobXState">;

export interface WhiteboardProps {
  sdkConfig: WhiteWindowSDKConfiguration;
  joinRoom: JoinRoom;
  instance: WhiteboardApp;
  managerConfig?: Omit<MountParams, "room" | "container">;
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
