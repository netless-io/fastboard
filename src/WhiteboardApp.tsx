import type { JoinRoom, ManagerConfig, SdkConfig } from "./internal";
import type { WindowManager } from "@netless/window-manager";
import type { Room, WhiteWebSdk } from "white-web-sdk";

import React, { createContext } from "react";
import ReactDOM from "react-dom";

import Root from "./Root";
import { noop } from "./internal";

export interface WhiteboardAppConfig {
  readonly target: HTMLElement;
  readonly sdkConfig: SdkConfig;
  readonly joinRoom: JoinRoom;
  readonly managerConfig?: Omit<ManagerConfig, "container">;
}

export interface Essentials {
  readonly sdk: WhiteWebSdk;
  readonly room: Room;
  readonly manager: WindowManager;
  // TODO: add fields like "hotkeys" for future usage (in toolbar)
}

export class WhiteboardApp {
  static readonly Context = createContext<WhiteboardApp | null>(null);

  readonly ready = false;
  private _resolveReady!: (props: Essentials) => void;
  readonly readyPromise = new Promise<void>(resolve => {
    this._resolveReady = (props: Essentials) => {
      this._resolveReady = noop;
      Object.assign(this, props);
      (this.ready as boolean) = true;
      resolve();
    };
  });

  readonly sdk: WhiteWebSdk | null = null;
  readonly room: Room | null = null;
  readonly manager: WindowManager | null = null;

  constructor(readonly config: WhiteboardAppConfig) {
    const { Context } = WhiteboardApp;
    ReactDOM.render(
      <Context.Provider value={this}>
        <Root />
      </Context.Provider>,
      config.target
    );
  }

  async dispose() {
    this.room && (await this.room.disconnect());
    ReactDOM.unmountComponentAtNode(this.config.target);
  }
}

export function useWhiteboardApp() {
  const app = React.useContext(WhiteboardApp.Context);
  if (!app) {
    throw new Error("useWhiteboardApp must be used within a WhiteboardApp");
  }
  return app;
}
