import type { WindowManager } from "@netless/window-manager";
import type { WhiteWebSdk, Room } from "white-web-sdk";
import type { Config } from "../..";

import React from "react";
import ReactDOM from "react-dom";
import { App } from ".";

export interface AcceptParams {
  readonly sdk: WhiteWebSdk;
  readonly room: Room;
  readonly manager: WindowManager;
}

export class WhiteboardApp {
  readonly target: Config["target"];

  sdk: WhiteWebSdk | null = null;
  room: Room | null = null;
  manager: WindowManager | null = null;

  private readonly restProps: Omit<Config, "target">;
  private destroyed = true;

  constructor({ target, ...restProps }: Config) {
    this.target = target;
    this.restProps = restProps;
    this.initialize();
  }

  initialize() {
    if (this.destroyed) {
      this.destroyed = false;
      this.forceUpdate();
    }
  }

  forceUpdate() {
    ReactDOM.render(<App {...this.restProps} instance={this} />, this.target);
  }

  accept({ sdk, room, manager }: AcceptParams) {
    this.sdk = sdk;
    this.room = room;
    this.manager = manager;
    this.forceUpdate();
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      ReactDOM.unmountComponentAtNode(this.target);
      this.sdk = this.room = this.manager = null;
    }
  }
}
