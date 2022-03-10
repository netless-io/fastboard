import type { FastboardApp } from "@netless/fastboard-core";
import type { DivProps, FastboardProps } from "../components/Fastboard";

import React from "react";
import ReactDOM from "react-dom";
import { Fastboard } from "../components/Fastboard";

export type MountProps = Omit<FastboardProps & DivProps, "ref">;

/**
 * Mount fastboard app to some dom, returns the updater and disposer.
 * @example
 * let app = await createFastboard({ ...config })
 * const { update, destroy } = mount(app, document.getElementById("whiteboard"))
 * update({ theme: 'dark' })
 * destroy()
 */
export function mount(app: FastboardApp, dom: HTMLElement, props: MountProps = {}) {
  ReactDOM.render(<Fastboard app={app} {...props} />, dom);
  return {
    update(props: MountProps = {}) {
      ReactDOM.render(<Fastboard app={app} {...props} />, dom);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(dom);
    },
  };
}
