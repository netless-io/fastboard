import type { WindowManager } from "@netless/window-manager";
import type { Room, WhiteWebSdk } from "white-web-sdk";
import type { JoinRoom, ManagerConfig, SdkConfig } from "./mount-whiteboard";

import React, { createContext } from "react";
import ReactDOM from "react-dom";
import Root from "../components/Root";
import { mountWhiteboard } from "./mount-whiteboard";
import { Lock } from "./helpers";
import type { InsertDocsParams } from "../WhiteboardApp";

export interface AcceptParams {
  readonly sdk: WhiteWebSdk;
  readonly room: Room;
  readonly manager: WindowManager;
}

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

export class Instance {
  static readonly Context = createContext<Instance | null>(null);

  readonly config: WhiteboardAppConfig;

  target: HTMLElement | null = null;
  sdk: WhiteWebSdk | null = null;
  room: Room | null = null;
  manager: WindowManager | null = null;

  _container: HTMLElement | null = null;
  _destroyed = true;
  _mounted: Promise<void> | null = null;
  _resolve: (() => void) | null = null;

  constructor(config: WhiteboardAppConfig) {
    this.target = config.target;
    this.config = config;
    this.initialize();
  }

  initialize() {
    if (this._destroyed) {
      this._destroyed = false;
      this.forceUpdate();
    }
  }

  forceUpdate() {
    this._mounted = new Promise(resolve => {
      ReactDOM.render(<Root instance={this} />, this.target);
      this._resolve = resolve;
    });
  }

  accept({ sdk, room, manager }: AcceptParams) {
    this.sdk = sdk;
    this.room = room;
    this.manager = manager;
    this.forceUpdate();
  }

  async dispose() {
    await this._unmount();
    if (!this._destroyed && this.target) {
      this._destroyed = true;
      ReactDOM.unmountComponentAtNode(this.target);
      this.sdk =
        this.room =
        this.manager =
        this.target =
        this._container =
          null;
    }
  }

  private _mountLock = new Lock();

  mount(container: HTMLElement) {
    this._container = container;
    this._mountLock.schedule(this._mount);
  }

  private _mount = async () => {
    if (this.room) {
      console.warn("[WhiteboardApp] Already mounted");
      return;
    }
    if (this._container) {
      try {
        const essentials = await mountWhiteboard(
          this.config.sdkConfig,
          this.config.joinRoom,
          { ...this.config.managerConfig, container: this._container }
        );
        this._resolve && this._resolve();
        this.accept(essentials);
      } catch (error) {
        console.warn("[WhiteboardApp] mount error", error);
      }
    }
  };

  unmount() {
    this._mountLock.schedule(this._unmount);
  }

  private _unmount = async () => {
    if (this.manager) {
      this.manager.destroy();
      this.manager = null;
    }
    if (this.room) {
      try {
        await this.room.disconnect();
      } catch {
        // ignore any error on disconnecting
      }
      this.room = null;
    }
  };

  public insertDocs = async (params: InsertDocsParams) => {
    if (this._mounted) {
      await this._mounted;
    }
    const fileType = params.fileType;
    if (fileType === "pdf" || fileType === "ppt") {
      return this.manager?.addApp({
        kind: "DocsViewer",
        options: {
          scenePath: params.params.scenePath,
          title: params.params.title,
          scenes: params.params.scenes,
        },
      });
    } else if (fileType === "pptx") {
      return this.manager?.addApp({
        kind: "Slide",
        options: {
          scenePath: params.params.scenePath,
          title: params.params.title,
        },
        attributes: {
          taskId: params.params.taskId,
          url: params.params.url,
        },
      });
    }
  };
}
