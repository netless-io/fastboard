import type { WhiteboardProps } from "../../components";
import type { NamedExoticComponent } from "react";

import React from "react";

import style from "../../style.scss?inline";

import { ToolBox, Whiteboard } from "../../components";
import { classNames } from "../../helpers/utils";
import { useStyleLoader } from "../hooks";

export * from "./instance";

export type AppProps = WhiteboardProps;

export function App(props: AppProps) {
  useStyleLoader(style);

  const { instance } = props;

  return (
    <div className={classNames("container")}>
      <Whiteboard {...props} />
      {instance.room && (
        <>
          <ToolBox room={instance.room} />
        </>
      )}
    </div>
  );
}

(App as NamedExoticComponent).displayName = "WhiteboardApp";
