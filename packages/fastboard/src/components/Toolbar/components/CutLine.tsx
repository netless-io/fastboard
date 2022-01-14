import clsx from "clsx";
import { useContext } from "preact/hooks";
import { ToolbarContext, name } from "../Toolbar";

export function CutLine() {
  const { theme } = useContext(ToolbarContext);
  return <span className={clsx(`${name}-cut-line`, theme)} />;
}
