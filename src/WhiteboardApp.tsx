import type { JoinRoom, ManagerConfig, SdkConfig } from "./internal";
import type { WindowManager } from "@netless/window-manager";
import type { Room, WhiteWebSdk } from "white-web-sdk";

import React, { createContext } from "react";
import ReactDOM from "react-dom";

import Root from "./components/Root";
import { noop } from "./internal";

export interface WhiteboardAppConfig {
  readonly target: HTMLElement;
  readonly sdkConfig: SdkConfig;
  readonly joinRoom: JoinRoom;
  readonly managerConfig?: Omit<ManagerConfig, "container">;
}

export interface EssentialProps {
  readonly sdk: WhiteWebSdk;
  readonly room: Room;
  readonly manager: WindowManager;
}

export class WhiteboardApp {
  static readonly Context = createContext<WhiteboardApp | null>(null);

  // we put `readonly` here to tell users not writing it
  readonly ready = false;

  // we put `private` here to let users not seeing it in vscode
  private _resolveReady!: (props: EssentialProps) => void;

  readonly readyPromise = new Promise<void>(resolve => {
    this._resolveReady = (props: EssentialProps) => {
      this._resolveReady = noop;
      Object.assign(this, props);
      // we have to use type cast to make typescript happy
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
