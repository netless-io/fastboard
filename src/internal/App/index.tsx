import style from "./style.scss?inline";

import type { WhiteboardProps } from "../../components";

import React, { useEffect } from "react";
import { ToolBox, Whiteboard } from "../../components";
import { classNames, injectStyle } from "../../helpers/utils";

export { WhiteboardApp } from "./instance";

export type AppProps = WhiteboardProps;

export function App(props: AppProps) {
  useEffect(() => {
    const styleElement = injectStyle(style);
    return () => {
      styleElement && document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className={classNames("container")}>
      <Whiteboard {...props} />
      <ToolBox />
    </div>
  );
}

App.displayName = "WhiteboardApp";
