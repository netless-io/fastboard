import type { WindowManager } from "@netless/window-manager";
import type { Room, SceneDefinition, WhiteWebSdk } from "white-web-sdk";
import type { JoinRoom, ManagerConfig, SdkConfig } from "./mount-whiteboard";

import React, { createContext } from "react";
import ReactDOM from "react-dom";

import Root from "../components/Root";
import { mountWhiteboard } from "./mount-whiteboard";
import { noop, Lock } from "./helpers";

export interface AcceptParams {
  readonly sdk: WhiteWebSdk;
  readonly room: Room;
  readonly manager: WindowManager;
}

export interface InsertDocsStatic {
  readonly fileType: "pdf" | "ppt";
  readonly scenePath: string;
  readonly scenes: SceneDefinition[];
  readonly title?: string;
}

export interface InsertDocsDynamic {
  readonly fileType: "pptx";
  readonly scenePath: string;
  readonly taskId: string;
  readonly title?: string;
  readonly url?: string;
}

export type InsertDocsParams = InsertDocsStatic | InsertDocsDynamic;

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

  _whiteboardContainer: HTMLElement | null = null;

  _destroyed = true;

  constructor(config: WhiteboardAppConfig) {
    this.target = config.target;
    this.config = config;
    this.resetManagerPromise();
    this.initialize();
  }

  _managerPromise!: Promise<WindowManager>;
  _resolveManager!: (manager: WindowManager) => void;

  resetManagerPromise() {
    this._managerPromise = new Promise<WindowManager>(resolve => {
      this._resolveManager = resolve;
    });
  }

  initialize() {
    if (this._destroyed) {
      this._destroyed = false;
      this.forceUpdate();
    }
  }

  forceUpdate() {
    ReactDOM.render(<Root instance={this} />, this.target);
  }

  accept({ sdk, room, manager }: AcceptParams) {
    this.sdk = sdk;
    this.room = room;
    this.manager = manager;
    this._resolveManager(manager);
    this._resolveManager = noop;
    this.forceUpdate();
  }

  async dispose() {
    await this._unmount();
    if (!this._destroyed && this.target) {
      this._destroyed = true;
      ReactDOM.unmountComponentAtNode(this.target);
      this.sdk = this.room = this.manager = this.target = null;
      this._whiteboardContainer = null;
    }
  }

  private _mountLock = new Lock();

  mount(container: HTMLElement) {
    this._whiteboardContainer = container;
    this._mountLock.schedule(this._mount);
  }

  private _mount = async () => {
    if (this.room) {
      console.warn("[WhiteboardApp] Already mounted");
      return;
    }
    if (this._whiteboardContainer) {
      try {
        const essentials = await mountWhiteboard(
          this.config.sdkConfig,
          this.config.joinRoom,
          { ...this.config.managerConfig, container: this._whiteboardContainer }
        );
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
      this.resetManagerPromise();
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

  async insertDocs(params: InsertDocsParams) {
    const manager = await this._managerPromise;
    switch (params.fileType) {
      case "pdf":
      case "ppt":
        return manager.addApp({
          kind: "DocsViewer",
          options: {
            scenePath: params.scenePath,
            title: params.title,
            scenes: params.scenes,
          },
        });
      case "pptx":
        return manager.addApp({
          kind: "Slide",
          options: {
            scenePath: params.scenePath,
            title: params.title,
          },
          attributes: {
            taskId: params.taskId,
            url: params.url,
          },
        });
    }
  }
}
