import type { PageControlProps } from "@netless/fastboard-ui";

import { PageControl as PageControlImpl } from "@netless/fastboard-ui";
import { wrapReactComponent } from "../hooks";

export type { PageControlProps };

export const PageControl = /* @__PURE__ */ wrapReactComponent<PageControlProps>(
  PageControlImpl,
  "PageControl"
);
