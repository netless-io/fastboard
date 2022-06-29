import type { AddPageParams, MountParams, NetlessApp, PublicEvent } from "@netless/window-manager";
import type {
  AnimationMode,
  ApplianceNames,
  Camera,
  Color,
  ConversionResponse,
  HotKey,
  HotKeys,
  JoinRoomParams,
  MemberState,
  Rectangle,
  Room,
  RoomCallbacks,
  RoomPhase as RoomPhaseEnum,
  RoomState,
  SceneDefinition,
  ShapeType,
  ViewCallbacks,
  WhiteWebSdkConfiguration,
} from "white-web-sdk";
import type { Diff, DiffOne, Storage, SyncedStore } from "@netless/synced-store";
import type { Disposable, Readable, Writable } from "../utils";

import { DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";
import { BuiltinApps, WindowManager } from "@netless/window-manager";
import { SyncedStorePlugin } from "@netless/synced-store";
import {
  convertedFileToScene,
  genUID,
  getImageSize,
  makeSlideParams,
  readable,
  warn,
  writable,
} from "../utils";
import {
  SyncRealCamera,
  ensure_official_plugins,
  is_store,
  normalize_camera,
  transform_app_status,
} from "../internal";
import { register } from "../behaviors";

type RoomPhase = `${RoomPhaseEnum}`;

export type {
  AddPageParams,
  AnimationMode,
  ApplianceNames,
  Camera,
  Color,
  ConversionResponse,
  HotKey,
  HotKeys,
  JoinRoomParams,
  MemberState,
  MountParams,
  NetlessApp,
  PublicEvent,
  Rectangle,
  Room,
  RoomPhase,
  RoomCallbacks,
  RoomState,
  SceneDefinition,
  ShapeType,
  SyncedStore,
  Storage,
  Diff,
  DiffOne,
  ViewCallbacks,
  WhiteWebSdk,
  WhiteWebSdkConfiguration,
  WindowManager,
};

/** pencil, eraser, rectangle... */
export type Appliance = `${ApplianceNames}`;
/** triangle, star... */
export type Shape = `${ShapeType}`;

/** Params for static docs, they are rendered as many images. */
export interface InsertDocsStatic {
  readonly fileType: "pdf";
  /** Unique string for binding whiteboard view to the doc. Must start with `/`. */
  readonly scenePath: string;
  /** @example [{ name: '1', ppt: { src: 'url/to/ppt/1.png' } }] */
  readonly scenes: SceneDefinition[];
  /** Window title. */
  readonly title?: string;
}

/** Params for slides, they are rendered in @netless/app-slide with animations. */
export interface InsertDocsDynamic {
  readonly fileType: "pptx";
  /** Unique string for binding whiteboard view to the doc. Must start with `/`. */
  readonly scenePath: string;
  /** Conversion task id, see https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress. */
  readonly taskId: string;
  /** Window title. */
  readonly title?: string;
  /** Where the slide resource placed. @default `https://convertcdn.netless.link/dynamicConvert` */
  readonly url?: string;
  /** @example [{ name: '1' }, { name: '2' }, { name: '3' }] */
  readonly scenes?: SceneDefinition[];
}

export interface ProjectorResponse {
  uuid: string;
  status: "Waiting" | "Converting" | "Finished" | "Fail";
  /** 0..100 */
  convertedPercentage: number;
  /** https://example.org/path/to/dynamicConvert */
  prefix: string;
  pageCount: number;
  /** {1:"{prefix}/{taskId}/preview/1.png"} */
  previews: Record<number, string>;
  /** {prefix}/{taskId}/jsonOutput/note.json */
  note: string;
  /** 20xxxxx */
  errorCode: `${number}`;
  errorMessage: string;
}

export type InsertDocsParams = InsertDocsStatic | InsertDocsDynamic;

export type SetMemberStateFn = (partialMemberState: Partial<MemberState>) => void;

export type RoomStateChanged = (diff: Partial<RoomState>) => void;

/** App download progress. */
export interface AppsStatus {
  [kind: string]: {
    status: "idle" | "loading" | "failed";
    /** Exist if status is `failed`. */
    reason?: string;
  };
}

export class FastboardApp<TEventData = any> {
  private _disposers: (() => void)[] = [];

  private _destroyed = false;
  private _assertNotDestroyed() {
    if (this._destroyed) throw new Error("FastboardApp has been destroyed");
  }

  private _addRoomListener<K extends keyof RoomCallbacks>(name: K, listener: RoomCallbacks[K]) {
    this._assertNotDestroyed();
    this.room.callbacks.on(name, listener);
    return () => this.room.callbacks.off(name, listener);
  }

  private _addManagerListener<K extends keyof PublicEvent>(
    name: K,
    listener: (value: PublicEvent[K]) => void
  ) {
    this._assertNotDestroyed();
    return this.manager.emitter.on(name, listener);
  }

  private _appsStatus: AppsStatus = {};
  private _syncRealCamera: SyncRealCamera = new SyncRealCamera(this);

  /**
   * Is current room writable?
   */
  readonly writable: Writable<boolean>;

  /**
   * Is current room online?
   */
  readonly phase: Readable<RoomPhase>;

  /**
   * Current window-manager's windows' state (is it maximized?).
   */
  readonly boxState: Readable<"minimized" | "maximized" | "normal" | undefined>;

  /**
   * Current window-manager's focused app's id.
   * @example "HelloWorld-1A2b3C4d"
   */
  readonly focusedApp: Readable<string | undefined>;

  /**
   * How many times can I call `app.redo()`?
   */
  readonly canRedoSteps: Readable<number>;

  /**
   * How many times can I call `app.undo()`?
   */
  readonly canUndoSteps: Readable<number>;

  /**
   * Baseline camera information.
   *
   * Change the camera position by `app.moveCamera()`.
   */
  readonly camera: Readable<Camera>;

  /**
   * Current tool's info, like "is using pencil?", "what color?".
   *
   * Change the tool by `app.setAppliance()`.
   */
  readonly memberState: Readable<MemberState>;

  /**
   * 0..n-1, current index of main view scenes.
   */
  readonly sceneIndex: Writable<number>;

  /**
   * How many pages are in the main view?
   */
  readonly sceneLength: Readable<number>;

  /**
   * Apps status.
   */
  readonly appsStatus: Readable<AppsStatus>;

  constructor(
    readonly sdk: WhiteWebSdk,
    readonly room: Room,
    readonly manager: WindowManager,
    readonly syncedStore: SyncedStore<TEventData>,
    readonly hotKeys: Partial<HotKeys>
  ) {
    this.writable = writable(
      room.isWritable,
      set => this._addRoomListener("onEnableWriteNowChanged", () => set(room.isWritable)),
      room.setWritable.bind(room)
    );
    this.phase = readable(room.phase, set => this._addRoomListener("onPhaseChanged", set));
    this.boxState = readable(manager.boxState, set => this._addManagerListener("boxStateChange", set));
    this.focusedApp = readable(manager.focused, set => this._addManagerListener("focusedChange", set));
    this.canRedoSteps = readable(manager.canRedoSteps, set =>
      this._addManagerListener("canRedoStepsChange", set)
    );
    this.canUndoSteps = readable(manager.canUndoSteps, set =>
      this._addManagerListener("canUndoStepsChange", set)
    );
    this.camera = readable(normalize_camera(manager.baseCamera), set => {
      this._syncRealCamera.set = set;
      return this._addManagerListener("baseCameraChange", baseCamera => {
        this._syncRealCamera.reset();
        set(normalize_camera(baseCamera));
      });
    });
    this.memberState = readable(room.state.memberState, set =>
      this._addRoomListener("onRoomStateChanged", ({ memberState: m }) => m && set(m))
    );
    this.sceneIndex = writable(
      manager.mainViewSceneIndex,
      set => this._addManagerListener("mainViewSceneIndexChange", set),
      manager.setMainViewSceneIndex.bind(manager)
    );
    this.sceneLength = readable(manager.mainViewScenesLength, set =>
      this._addManagerListener("mainViewScenesLengthChange", set)
    );
    this.appsStatus = readable((this._appsStatus = {}), set =>
      this._addManagerListener("loadApp", ({ kind, status, reason }) => {
        this._appsStatus[kind] = { status: transform_app_status(status), reason };
        set(this._appsStatus);
      })
    );
    Object.getOwnPropertyNames(this).forEach(key => {
      const prop = (this as any)[key];
      if (is_store(prop)) this._disposers.push((prop as Disposable).dispose.bind(prop));
    });
  }

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
   * Destroy fastboard (disconnect from the whiteboard room).
   */
  destroy() {
    this._destroyed = true;
    this._disposers.forEach(dispose => dispose());
    this._disposers.length = 0;
    this.manager.destroy();
    return this.room.disconnect();
  }

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
  moveCamera(camera: Partial<Camera> & { animationMode?: AnimationMode }) {
    this._assertNotDestroyed();
    this._syncRealCamera.start(this.manager.mainView.camera.scale);
    this.manager.moveCamera(camera);
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

  /**
   * Set pencil and shape's thickness.
   */
  setStrokeWidth(strokeWidth: number) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeWidth });
  }

  /**
   * Set pencil and shape's color.
   */
  setStrokeColor(strokeColor: Color) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeColor });
  }

  /**
   * Set text size. Default is 16.
   */
  setTextSize(textSize: number) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ textSize });
  }

  /**
   * Set text color.
   *
   * @example
   * setTextColor([0x66, 0xcc, 0xff])
   */
  setTextColor(textColor: Color) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ textColor });
  }

  toggleDottedLine(force?: boolean) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ dottedLine: force ?? !this.memberState.value.dottedLine });
  }

  /**
   * Goto previous page (the main whiteboard view).
   */
  prevPage() {
    this._assertNotDestroyed();
    return this.manager.prevPage();
  }

  /**
   * Goto next page (the main whiteboard view).
   */
  nextPage() {
    this._assertNotDestroyed();
    return this.manager.nextPage();
  }

  /**
   * Add one page to the main whiteboard view.
   *
   * @example
   * addPage({ after: true }) // add one page right after current one.
   * nextPage() // then, goto that page.
   */
  addPage(params?: AddPageParams) {
    this._assertNotDestroyed();
    return this.manager.addPage(params);
  }

  /**
   * Remove one page at given index or current page (by default).
   *
   * Requires `@netless/window-manager` >= 0.4.30.
   *
   * @example
   * removePage() // remove current page
   */
  removePage(index?: number) {
    this._assertNotDestroyed();
    return this.manager.removePage(index);
  }

  /**
   * Insert an image to the main view.
   *
   * @example
   * insertImage("https://i.imgur.com/CzXTtJV.jpg")
   */
  async insertImage(url: string) {
    this._assertNotDestroyed();
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
    this.manager.moveCamera({ centerX: 0, centerY: 0 });
    this.manager.setBaseSize({ width, height });
  }

  /**
   * Insert PDF/PPTX from conversion result.
   * @param response https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress
   */
  insertDocs(filename: string, response: ConversionResponse): Promise<string | undefined>;

  /**
   * Insert PDF/PPTX from projector conversion result.
   * @param response https://developer.netless.link/server-zh/home/server-projector#get-%E6%9F%A5%E8%AF%A2%E4%BB%BB%E5%8A%A1%E8%BD%AC%E6%8D%A2%E8%BF%9B%E5%BA%A6
   */
  insertDocs(filename: string, response: ProjectorResponse): Promise<string | undefined>;

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

  insertDocs(arg1: string | InsertDocsParams, arg2?: ConversionResponse | ProjectorResponse) {
    this._assertNotDestroyed();
    if (typeof arg1 === "object" && "fileType" in arg1) {
      return this._insertDocsImpl(arg1);
    } else if (arg2 && arg2.status !== "Finished") {
      throw new Error("FastboardApp cannot insert a converting doc.");
    } else if (arg2 && "progress" in arg2) {
      const title = arg1;
      const scenePath = `/${arg2.uuid}/${genUID()}`;
      const scenes1 = arg2.progress.convertedFileList.map(convertedFileToScene);
      const { scenes, taskId, url } = makeSlideParams(scenes1);
      if (taskId && url) {
        return this._insertDocsImpl({ fileType: "pptx", scenePath, scenes, title, taskId, url });
      } else {
        return this._insertDocsImpl({ fileType: "pdf", scenePath, scenes: scenes1, title });
      }
    } else if (arg2 && "prefix" in arg2) {
      const title = arg1;
      const scenePath = `/${arg2.uuid}/${genUID()}`;
      const taskId = arg2.uuid;
      const url = arg2.prefix;
      this._insertDocsImpl({ fileType: "pptx", scenePath, taskId, title, url });
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
        if (scenes && scenes[0].ppt) warn("no-ppt-in-scenes");
        return this.manager.addApp({
          kind: "Slide",
          options: { scenePath, title, scenes },
          attributes,
        });
    }
  }

  /**
   * Insert sounds and videos.
   */
  insertMedia(title: string, src: string) {
    this._assertNotDestroyed();
    return this.manager.addApp({
      kind: BuiltinApps.MediaPlayer,
      options: { title },
      attributes: { src },
    });
  }
}

export interface FastboardOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState"> & {
    region: NonNullable<WhiteWebSdkConfiguration["region"]>;
  };
  joinRoom: Omit<JoinRoomParams, "useMultiViews" | "disableNewPencil" | "disableMagixEventDispatchLimit"> & {
    callbacks?: Partial<RoomCallbacks>;
  };
  managerConfig?: Omit<MountParams, "room">;
  netlessApps?: NetlessApp[];
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
export async function createFastboard<TEventData = any>({
  sdkConfig,
  joinRoom: { callbacks, ...joinRoomParams },
  managerConfig,
  netlessApps,
}: FastboardOptions) {
  const sdk = new WhiteWebSdk({
    ...sdkConfig,
    useMobXState: true,
  });

  const hotKeys = joinRoomParams.hotKeys || {
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

  if (netlessApps) {
    netlessApps.forEach(app => {
      register({ kind: app.kind, src: app });
    });
  }

  const room = await sdk.joinRoom(
    {
      floatBar: true,
      disableEraseImage: true,
      hotKeys,
      ...ensure_official_plugins(joinRoomParams),
      useMultiViews: true,
      disableNewPencil: false,
      disableMagixEventDispatchLimit: true,
    },
    callbacks
  );

  const syncedStore = await SyncedStorePlugin.init<TEventData>(room);

  const manager = await WindowManager.mount({
    cursor: true,
    ...managerConfig,
    room,
  });

  return new FastboardApp<TEventData>(sdk, room, manager, syncedStore, hotKeys);
}
