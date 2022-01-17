import clsx from "clsx";
import React, { useContext } from "react";
import { ToolbarContext, name } from "../Toolbar";

export function CutLine() {
  const { theme } = useContext(ToolbarContext);
  return <span className={clsx(`${name}-cut-line`, theme)} />;
}
