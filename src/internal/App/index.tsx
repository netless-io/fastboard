import style from "../../style.scss?inline";

import type { NamedExoticComponent } from "react";
import type { WhiteboardProps } from "../../components";

import React, { useCallback, useState } from "react";
import { ToolBox, Whiteboard } from "../../components";
import { classNames } from "../../helpers/utils";
import { useStyleLoader } from "../hooks";

export { WhiteboardApp } from "./instance";

export type AppProps = WhiteboardProps;

export function App(props: AppProps) {
  const [, setState] = useState([]);
  const forceUpdate = useCallback(() => setState([]), []);
  useStyleLoader(style);

  const { instance } = props;

  return (
    <div className={classNames("container")}>
      <Whiteboard {...props} onMount={forceUpdate} />
      <ToolBox instance={instance} />
    </div>
  );
}

(App as NamedExoticComponent).displayName = "WhiteboardApp";
