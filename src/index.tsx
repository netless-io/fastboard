import React from "react";
import ReactDOM from "react-dom";
import { Room, WhiteWebSdk } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

import { App, AppProps } from "./App";

export type Config = Omit<AppProps, "instance"> & {
  target: HTMLElement;
};

export class WhiteboardApp {
  target: Config["target"];

  sdk: WhiteWebSdk | null = null;
  room: Room | null = null;
  manager: WindowManager | null = null;

  constructor({ target, ...restProps }: Config) {
    this.target = target;
    ReactDOM.render(<App {...restProps} instance={this} />, target);
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.target);
  }
}

export function createWhiteboardApp(config: Config) {
  return new WhiteboardApp(config);
}
