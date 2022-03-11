import type { FastboardProps, ReplayFastboardProps } from "@netless/fastboard-ui";

import { Fastboard as FastboardImpl, ReplayFastboard as ReplayFastboardImpl } from "@netless/fastboard-ui";
import { wrapReactComponent } from "./hooks";

export type { FastboardProps, ReplayFastboardProps };

export const Fastboard = /* @__PURE__ */ wrapReactComponent<FastboardProps>(FastboardImpl, "Fastboard");
export const ReplayFastboard = /* @__PURE__ */ wrapReactComponent<ReplayFastboardProps>(
  ReplayFastboardImpl,
  "ReplayFastboard"
);
