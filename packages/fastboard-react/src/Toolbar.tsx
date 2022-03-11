import type { ToolbarProps } from "@netless/fastboard-ui";

import { Toolbar as ToolbarImpl } from "@netless/fastboard-ui";
import { wrapReactComponent } from "./hooks";

export type { ToolbarProps };

export const Toolbar = /* @__PURE__ */ wrapReactComponent<ToolbarProps>(ToolbarImpl, "Toolbar");
