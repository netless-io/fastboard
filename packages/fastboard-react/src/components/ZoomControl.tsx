import type { ZoomControlProps } from "@netless/fastboard-ui";

import { ZoomControl as ZoomControlImpl } from "@netless/fastboard-ui";
import { wrapReactComponent } from "../hooks";

export type { ZoomControlProps };

export const ZoomControl = /* @__PURE__ */ wrapReactComponent<ZoomControlProps>(
  ZoomControlImpl,
  "ZoomControl"
);
