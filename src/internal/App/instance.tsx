import type { WindowManager } from "@netless/window-manager";
import type { WhiteWebSdk, Room } from "white-web-sdk";
import type { Config } from "../..";

import React from "react";
import ReactDOM from "react-dom";
import { App } from ".";

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
