import type { PublicEvent, WindowManager } from "@netless/window-manager";
import type {
  AnimationMode,
  ApplianceNames,
  Camera,
  Color,
  ConversionResponse,
  HotKeys,
  MemberState,
  Rectangle,
  Room,
  RoomCallbacks,
  RoomState,
  SceneDefinition,
  ShapeType,
  ViewCallbacks,
  WhiteWebSdk,
} from "white-web-sdk";
import type { FastboardDisposer, FastboardInternalValue } from "../helpers/value";

import { BuiltinApps } from "@netless/window-manager";
import { convertedFileToScene, genUID, getImageSize, makeSlideParams } from "../helpers/utils";
import { createValue } from "../helpers/value";

class FastboardAppBase {
  public constructor(
    readonly sdk: WhiteWebSdk,
    readonly room: Room,
    readonly manager: WindowManager,
    readonly hotKeys: Partial<HotKeys>
  ) {}

  protected readonly _disposers: FastboardDisposer[] = [];
  protected _destroyed = false;
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("[FastboardApp] Can not call any method on destroyed FastboardApp.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected createValue: typeof createValue = (...args: [any, any]): any => {
    const value = createValue(...args);
    this._disposers.push((value as FastboardInternalValue<unknown>).dispose);
    return value;
  };

  protected _addRoomListener<K extends keyof RoomCallbacks, T = RoomCallbacks[K]>(name: K, listener: T) {
    this._assertNotDestroyed();
    this.room.callbacks.on(name, listener);
    return () => this.room.callbacks.off(name, listener);
  }

  protected _addManagerListener<K extends keyof PublicEvent>(name: K, set: (value: PublicEvent[K]) => void) {
    this._assertNotDestroyed();
    this.manager.emitter.on(name, set);
    return () => this.manager.emitter.off(name, set);
  }

  protected _addMainViewListener<K extends keyof ViewCallbacks, T = ViewCallbacks[K]>(name: K, listener: T) {
    this._assertNotDestroyed();
    this.manager.mainView.callbacks.on(name, listener);
    return () => this.manager.mainView.callbacks.off(name, listener);
  }

  public destroy() {
    this._disposers.forEach(dispose => dispose());
    this._disposers.length = 0;
    this._destroyed = true;
    this.manager.destroy();
    return this.room.disconnect();
  }
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
  readonly writable = this.createValue(
    this.room.isWritable,
    set => this._addRoomListener("onEnableWriteNowChanged", () => set(this.room.isWritable)),
    this.room.setWritable.bind(this.room)
  );

  /**
   * Current window-manager's windows' state (is it maximized?).
   */
  readonly boxState = this.createValue(this.manager.boxState, set =>
    this._addManagerListener("boxStateChange", set)
  );

  /**
   * Current window-manager's focused app's id.
   * @example "HelloWorld-1A2b3C4d"
   */
  readonly focusedApp = this.createValue(this.manager.focused, set =>
    this._addManagerListener("focusedChange", set)
  );

  /**
   * How many times can I call `app.redo()`?
   */
  readonly canRedoSteps = this.createValue(this.manager.canRedoSteps, set =>
    this._addManagerListener("canRedoStepsChange", set)
  );

  /**
   * How many times can I call `app.undo()`?
   */
  readonly canUndoSteps = this.createValue(this.manager.canUndoSteps, set =>
    this._addManagerListener("canUndoStepsChange", set)
  );

  /**
   * Current camera information of main view.
   */
  readonly camera = this.createValue(this.manager.mainView.camera, set =>
    this._addMainViewListener("onCameraUpdated", set)
  );

  /**
   * Current tool's info, like "is using pencil?", "what color?".
   */
  readonly memberState = this.createValue(this.room.state.memberState, set =>
    this._addRoomListener("onRoomStateChanged", ({ memberState: m }) => m && set(m))
  );

  /**
   * 0..n-1, current index of main view scenes.
   */
  readonly sceneIndex = this.createValue(
    this.manager.mainViewSceneIndex,
    set => this._addManagerListener("mainViewSceneIndexChange", set),
    this.manager.setMainViewSceneIndex.bind(this.manager)
  );

  /**
   * How many pages are in the main view?
   */
  readonly sceneLength = this.createValue(this.manager.mainViewScenesLength, set =>
    this._addManagerListener("mainViewScenesLengthChange", set)
  );

  private _appsStatus: AppsStatus = {};
  /**
   * Apps status.
   */
  readonly appsStatus = this.createValue<AppsStatus>({}, set =>
    this._addManagerListener("loadApp", ({ kind, status, reason }) => {
      this._appsStatus[kind] = {
        status: status === "start" ? "loading" : status === "failed" ? "failed" : "idle",
        reason,
      };
      set(this._appsStatus);
    })
  );

  /**
   * Undo a step on main view.
   */
  undo() {
    this._assertNotDestroyed();
    this.manager.mainView.undo();
  }

  /**
   * Redo a step on main view.
   */
  redo() {
    this._assertNotDestroyed();
    this.manager.mainView.redo();
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
  setAppliance(appliance: ApplianceNames, shape?: ShapeType) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ currentApplianceName: appliance, shapeType: shape });
  }

  setStrokeWidth(strokeWidth: number) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeWidth });
  }

  setStrokeColor(strokeColor: Color) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeColor });
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
    if (typeof arg1 === "object" && "fileType" in arg1) {
      return this._insertDocsImpl(arg1);
    } else if (arg2 && arg2.status !== "Finished") {
      throw new Error("[FastboardApp] Can not insert a converting doc.");
    } else if (arg2 && arg2.progress) {
      const scenes: SceneDefinition[] = arg2.progress.convertedFileList.map(convertedFileToScene);
      const scenePath = `/${arg2.uuid}/${genUID()}`;
      const { emptyScenes, taskId, url } = makeSlideParams(scenes);
      if (taskId && url) {
        const title = arg1;
        return this._insertDocsImpl({ fileType: "pptx", scenePath, taskId, title, url, scenes: emptyScenes });
      } else {
        return this._insertDocsImpl({ fileType: "pdf", scenePath, scenes, title: arg1 });
      }
    }
  }

  private _insertDocsImpl({ fileType, scenePath, title, scenes, ...attributes }: InsertDocsParams) {
    this._assertNotDestroyed();
    switch (fileType) {
      case "pdf":
      case "ppt":
        return this.manager.addApp({
          kind: "DocsViewer",
          options: { scenePath, title, scenes },
        });
      case "pptx":
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
