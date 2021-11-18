import style from "./style.scss?inline";

import type { NamedExoticComponent } from "react";
import type { WhiteboardProps } from "../../components";

import React from "react";
import { ToolBox, Whiteboard } from "../../components";
import { classNames } from "../../helpers/utils";
import { useStyleLoader } from "../hooks";

export { WhiteboardApp } from "./instance";

export type AppProps = WhiteboardProps;

export function App(props: AppProps) {
  useStyleLoader(style);

  return (
    <div className={classNames("container")}>
      <Whiteboard {...props} />
      <ToolBox />
    </div>
  );
}

(App as NamedExoticComponent).displayName = "WhiteboardApp";
