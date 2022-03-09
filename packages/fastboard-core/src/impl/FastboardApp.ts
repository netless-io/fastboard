import type { AddPageParams, PublicEvent, MountParams } from "@netless/window-manager";
import type {
  AnimationMode,
  ApplianceNames,
  Camera,
  Color,
  ConversionResponse,
  HotKeys,
  JoinRoomParams,
  MemberState,
  Rectangle,
  Room,
  RoomCallbacks,
  RoomState,
  SceneDefinition,
  ShapeType,
  ViewCallbacks,
  WhiteWebSdkConfiguration,
} from "white-web-sdk";
import type { AppsConfig } from "../behaviors";

import { DefaultHotKeys, WhiteWebSdk, contentModeScale } from "white-web-sdk";
import { BuiltinApps, WindowManager } from "@netless/window-manager";
import { getImageSize, genUID, convertedFileToScene, makeSlideParams, readable, writable, warn } from "../utils";
import { ensure_window_manager, transform_app_status } from "../internal";

class FastboardAppBase {
  public constructor(
    readonly sdk: WhiteWebSdk,
    readonly room: Room,
    readonly manager: WindowManager,
    readonly hotKeys: Partial<HotKeys>
  ) {}

  protected _destroyed = false;
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("FastboardApp has been destroyed");
    }
  }

  protected _addRoomListener<K extends keyof RoomCallbacks>(name: K, listener: RoomCallbacks[K]) {
    this._assertNotDestroyed();
    this.room.callbacks.on(name, listener);
    return () => this.room.callbacks.off(name, listener);
  }

  protected _addManagerListener<K extends keyof PublicEvent>(name: K, listener: (value: PublicEvent[K]) => void) {
    this._assertNotDestroyed();
    this.manager.emitter.on(name, listener);
    return () => this.manager.emitter.off(name, listener);
  }

  protected _addMainViewListener<K extends keyof ViewCallbacks>(name: K, listener: ViewCallbacks[K]) {
    this._assertNotDestroyed();
    this.manager.mainView.callbacks.on(name, listener);
    return () => this.manager.mainView.callbacks.off(name, listener);
  }

  public destroy() {
    this._destroyed = true;
    this.manager.destroy();
    return this.room.disconnect();
  }
}

export type {
  WhiteWebSdk,
  Room,
  WindowManager,
  HotKeys,
  SceneDefinition,
  Camera,
  Rectangle,
  MemberState,
  ApplianceNames,
  ShapeType,
  AddPageParams,
  AppsConfig,
};

export type Appliance = `${ApplianceNames}`;
export type Shape = `${ShapeType}`;

export interface InsertDocsStatic {
  readonly fileType: "pdf";
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
  /** @example [{ name: '1' }, { name: '2' }, { name: '3' }] */
  readonly scenes?: SceneDefinition[];
}

export type InsertDocsParams = InsertDocsStatic | InsertDocsDynamic;

export type SetMemberStateFn = (partialMemberState: Partial<MemberState>) => void;

export type RoomStateChanged = (diff: Partial<RoomState>) => void;

export interface AppsStatus {
  [kind: string]: {
    status: "idle" | "loading" | "failed";
    reason?: string;
  };
}

export class FastboardApp extends FastboardAppBase {
  /**
   * Render this app to some DOM.
   */
  bindContainer(container: HTMLElement) {
    this._assertNotDestroyed();
    this.manager.bindContainer(container);
  }

  /**
   * Move window-manager's collector to some place.
   */
  bindCollector(container: HTMLElement) {
    this._assertNotDestroyed();
    this.manager.bindCollectorContainer(container);
  }

  /**
   * Is current room writable?
   */
  readonly writable = writable(
    this.room.isWritable,
    set => this._addRoomListener("onEnableWriteNowChanged", () => set(this.room.isWritable)),
    this.room.setWritable.bind(this.room)
  );

  /**
   * Current window-manager's windows' state (is it maximized?).
   */
  readonly boxState = readable(this.manager.boxState, set => this._addManagerListener("boxStateChange", set));

  /**
   * Current window-manager's focused app's id.
   * @example "HelloWorld-1A2b3C4d"
   */
  readonly focusedApp = readable(this.manager.focused, set => this._addManagerListener("focusedChange", set));

  /**
   * How many times can I call `app.redo()`?
   */
  readonly canRedoSteps = readable(this.manager.canRedoSteps, set =>
    this._addManagerListener("canRedoStepsChange", set)
  );

  /**
   * How many times can I call `app.undo()`?
   */
  readonly canUndoSteps = readable(this.manager.canUndoSteps, set =>
    this._addManagerListener("canUndoStepsChange", set)
  );

  /**
   * Current camera information of main view.
   *
   * Change the camera position by `app.moveCamera()`.
   */
  readonly camera = readable(this.manager.mainView.camera, set => this._addMainViewListener("onCameraUpdated", set));

  /**
   * Current tool's info, like "is using pencil?", "what color?".
   *
   * Change the tool by `app.setAppliance()`.
   */
  readonly memberState = readable(this.room.state.memberState, set =>
    this._addRoomListener("onRoomStateChanged", ({ memberState: m }) => m && set(m))
  );

  /**
   * 0..n-1, current index of main view scenes.
   */
  readonly sceneIndex = writable(
    this.manager.mainViewSceneIndex,
    set => this._addManagerListener("mainViewSceneIndexChange", set),
    this.manager.setMainViewSceneIndex.bind(this.manager)
  );

  /**
   * How many pages are in the main view?
   */
  readonly sceneLength = readable(this.manager.mainViewScenesLength, set =>
    this._addManagerListener("mainViewScenesLengthChange", set)
  );

  private _appsStatus: AppsStatus = {};
  /**
   * Apps status.
   */
  readonly appsStatus = readable<AppsStatus>({}, set =>
    this._addManagerListener("loadApp", ({ kind, status, reason }) => {
      this._appsStatus[kind] = { status: transform_app_status(status), reason };
      set(this._appsStatus);
    })
  );

  /**
   * Undo a step on main view.
   */
  undo() {
    this._assertNotDestroyed();
    this.manager.undo();
  }

  /**
   * Redo a step on main view.
   */
  redo() {
    this._assertNotDestroyed();
    this.manager.redo();
  }

  /**
   * Move current main view's camera position.
   */
  moveCamera(camera: Partial<Camera> & { animationMode?: AnimationMode | undefined }) {
    this._assertNotDestroyed();
    this.manager.moveCamera(camera);
  }

  /**
   * Move current main view's camera to include a rectangle.
   */
  moveCameraToContain(rectangle: Rectangle & { animationMode?: AnimationMode }) {
    this._assertNotDestroyed();
    this.manager.moveCameraToContain(rectangle);
  }

  /**
   * Delete all things on the main view.
   */
  cleanCurrentScene() {
    this._assertNotDestroyed();
    this.manager.cleanCurrentScene();
  }

  /**
   * Set current tool, like "pencil".
   */
  setAppliance(appliance: ApplianceNames | Appliance, shape?: ShapeType | Shape) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({
      currentApplianceName: appliance as ApplianceNames,
      shapeType: shape as ShapeType,
    });
  }

  setStrokeWidth(strokeWidth: number) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeWidth });
  }

  setStrokeColor(strokeColor: Color) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeColor });
  }

  prevPage() {
    this._assertNotDestroyed();
    return this.manager.prevPage();
  }

  nextPage() {
    this._assertNotDestroyed();
    return this.manager.nextPage();
  }

  addPage(params?: AddPageParams) {
    this._assertNotDestroyed();
    return this.manager.addPage(params);
  }

  /**
   * Insert an image to the main view.
   */
  async insertImage(url: string) {
    this._assertNotDestroyed();
    await this.manager.switchMainViewToWriter();

    const { divElement } = this.manager.mainView;
    const containerSize = {
      width: divElement?.scrollWidth || window.innerWidth,
      height: divElement?.scrollHeight || window.innerHeight,
    };

    // 1. shrink the image a little to fit container **width**
    const maxWidth = containerSize.width * 0.8;
    let { width, height } = await getImageSize(url, containerSize);
    const scale = Math.min(maxWidth / width, 1);
    const uuid = genUID();
    const { centerX, centerY } = this.manager.camera;
    width *= scale;
    height *= scale;
    this.manager.mainView.insertImage({ uuid, centerX, centerY, width, height, locked: false });
    this.manager.mainView.completeImageUpload(uuid, url);

    // 2. move camera to fit image **height**
    width /= 0.8;
    height /= 0.8;
    const originX = centerX - width / 2;
    const originY = centerY - height / 2;
    this.manager.moveCameraToContain({ originX, originY, width, height });
  }

  /**
   * Insert PDF/PPTX from conversion result.
   * @param status https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress
   */
  insertDocs(filename: string, status: ConversionResponse): Promise<string | undefined>;

  /**
   * Manual way.
   * @example
   * app.insertDocs({
   *   fileType: 'pptx',
   *   scenePath: `/pptx/${conversion.taskId}`,
   *   taskId: conversion.taskId,
   *   title: 'Title',
   * })
   */
  insertDocs(params: InsertDocsParams): Promise<string | undefined>;

  insertDocs(arg1: string | InsertDocsParams, arg2?: ConversionResponse) {
    this._assertNotDestroyed();
    if (typeof arg1 === "object" && "fileType" in arg1) {
      return this._insertDocsImpl(arg1);
    } else if (arg2 && arg2.status !== "Finished") {
      throw new Error("FastboardApp cannot insert a converting doc.");
    } else if (arg2 && arg2.progress) {
      const title = arg1;
      const scenePath = `/${arg2.uuid}/${genUID()}`;
      const scenes1 = arg2.progress.convertedFileList.map(convertedFileToScene);
      const { scenes, taskId, url } = makeSlideParams(scenes1);
      if (taskId && url) {
        return this._insertDocsImpl({ fileType: "pptx", scenePath, scenes, title, taskId, url });
      } else {
        return this._insertDocsImpl({ fileType: "pdf", scenePath, scenes: scenes1, title });
      }
    }
  }

  private _insertDocsImpl({ fileType, scenePath, title, scenes, ...attributes }: InsertDocsParams) {
    this._assertNotDestroyed();
    switch (fileType) {
      case "pdf":
        return this.manager.addApp({
          kind: "DocsViewer",
          options: { scenePath, title, scenes },
        });
      case "pptx":
        if (scenes && scenes[0].ppt) {
          warn("no-ppt-in-scenes");
        }
        return this.manager.addApp({
          kind: "Slide",
          options: { scenePath, title, scenes },
          attributes,
        });
    }
  }

  /**
   * Insert the Monaco Code Editor app.
   */
  insertCodeEditor() {
    this._assertNotDestroyed();
    return this.manager.addApp({
      kind: "Monaco",
      options: { title: "Code Editor" },
    });
  }

  /**
   * Insert the Countdown app.
   */
  insertCountdown() {
    this._assertNotDestroyed();
    return this.manager.addApp({
      kind: "Countdown",
      options: { title: "Countdown" },
    });
  }

  /**
   * Insert the Media Player app.
   */
  insertMedia(title: string, src: string) {
    this._assertNotDestroyed();
    return this.manager.addApp({
      kind: BuiltinApps.MediaPlayer,
      options: { title },
      attributes: { src },
    });
  }

  /**
   * Insert the GeoGebra app.
   */
  insertGeoGebra() {
    this._assertNotDestroyed();
    return this.manager.addApp({
      kind: "GeoGebra",
      options: { title: "GeoGebra" },
    });
  }
}

export interface FastboardOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState">;
  joinRoom: Omit<JoinRoomParams, "useMultiViews" | "disableNewPencil" | "disableMagixEventDispatchLimit"> & {
    callbacks?: Partial<RoomCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
  appsConfig?: AppsConfig;
}

/**
 * Create a FastboardApp instance.
 * @example
 * let app = await createFastboard({
 *   sdkConfig: {
 *     appIdentifier: import.meta.env.VITE_APPID,
 *     region: 'cn-hz',
 *   },
 *   joinRoom: {
 *     uid: unique_id,
 *     uuid: import.meta.env.VITE_ROOM_UUID,
 *     roomToken: import.meta.env.VITE_ROOM_TOKEN,
 *   },
 * })
 */
export async function createFastboard({
  sdkConfig,
  joinRoom: { callbacks, ...joinRoomParams },
  managerConfig,
}: FastboardOptions) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  const hotKeys: Partial<HotKeys> = {
    ...DefaultHotKeys,
    changeToSelector: "s",
    changeToLaserPointer: "z",
    changeToPencil: "p",
    changeToRectangle: "r",
    changeToEllipse: "c",
    changeToEraser: "e",
    changeToText: "t",
    changeToStraight: "l",
    changeToArrow: "a",
    changeToHand: "h",
  };

  const room = await sdk.joinRoom(
    {
      floatBar: true,
      hotKeys,
      ...ensure_window_manager(joinRoomParams),
      useMultiViews: true,
      disableNewPencil: false,
      disableMagixEventDispatchLimit: true,
    },
    callbacks
  );

  const manager = await WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room,
  });

  manager.mainView.setCameraBound({
    minContentMode: contentModeScale(0.3),
    maxContentMode: contentModeScale(3),
  });

  return new FastboardApp(sdk, room, manager, hotKeys);
}
