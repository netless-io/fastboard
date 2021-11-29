import type { WindowManager } from "@netless/window-manager";
import type { SvelteComponentTyped } from "svelte";
import type { Room, WhiteWebSdk } from "white-web-sdk";
import type { JoinRoom, ManagerConfig, SdkConfig } from ".";

import { SideEffectManager } from "side-effect-manager";

import style from "@netless/window-manager/dist/style.css?inline";
import Root from "../components/Root.svelte";
import { mountWhiteboard, useStyle, Lock } from ".";

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
  static readonly Context = Symbol("WhiteboardApp");

  sdk: WhiteWebSdk | null = null;
  room: Room | null = null;
  manager: WindowManager | null = null;
  container: HTMLElement | null = null;

  readonly root: SvelteComponentTyped;
  readonly sideEffect = new SideEffectManager();

  constructor(readonly config: WhiteboardAppConfig) {
    this.sideEffect.addDisposer(useStyle(style));
    this.root = new Root({
      target: config.target,
      props: { instance: this },
    });
  }

  private _mountLock = new Lock();

  mount(container: HTMLElement) {
    this.container = container;
    this._mountLock.schedule(this._mount);
  }

  private _mount = async () => {
    if (this.room) {
      console.warn("[WhiteboardApp] Already mounted");
      return;
    }
    if (this.container) {
      try {
        const essentials = await mountWhiteboard(this.config.sdkConfig, this.config.joinRoom, {
          ...this.config.managerConfig,
          container: this.container,
        });
        this.sdk = essentials.sdk;
        this.room = essentials.room;
        this.manager = essentials.manager;
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

  dispose() {
    this.root.$destroy();
    this.sideEffect.flushAll();
    this.unmount();
  }
}
