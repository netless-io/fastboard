import style from "./style.scss?inline";

import React, { useEffect } from "react";
import { ToolBox, Whiteboard, WhiteboardProps } from "./components";
import { classNames, injectStyle } from "./helpers/utils";

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
