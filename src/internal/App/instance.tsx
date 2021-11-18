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

  private destroyed = true;
  private restProps: Omit<Config, "target">;

  constructor({ target, ...restProps }: Config) {
    this.target = target;
    this.restProps = restProps;
    this.initialize();
  }

  initialize() {
    if (this.destroyed) {
      this.destroyed = false;
      ReactDOM.render(<App {...this.restProps} instance={this} />, this.target);
    }
  }

  accept({ sdk, room, manager }: { sdk: WhiteWebSdk; room: Room; manager: WindowManager }) {
    this.sdk = sdk;
    this.room = room;
    this.manager = manager;
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      ReactDOM.unmountComponentAtNode(this.target);
      this.sdk = this.room = this.manager = null;
    }
  }
}
