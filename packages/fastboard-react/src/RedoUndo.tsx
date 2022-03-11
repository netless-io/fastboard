import type { RedoUndoProps } from "@netless/fastboard-ui";

import { RedoUndo as RedoUndoImpl } from "@netless/fastboard-ui";
import { wrapReactComponent } from "./hooks";

export type { RedoUndoProps };

export const RedoUndo = /* @__PURE__ */ wrapReactComponent<RedoUndoProps>(RedoUndoImpl, "RedoUndo");
