import type { FastboardApp } from "@netless/fastboard-core";
import type { DivProps, FastboardProps } from "../components/Fastboard";

import React from "react";
import ReactDOM from "react-dom";
import { Fastboard } from "../components/Fastboard";

/**
 * Mount fastboard app to some dom, returns the disposer, which will unmount the app.
 * @example
 * let app = await createFastboard({ ...config })
 * let disposer = mount(app, document.getElementById("whiteboard"))
 * disposer()
 */
export function mount(app: FastboardApp, dom: HTMLElement, props: Omit<FastboardProps & DivProps, "ref">) {
  ReactDOM.render(<Fastboard app={app} {...props} />, dom);
  return () => ReactDOM.unmountComponentAtNode(dom);
}
