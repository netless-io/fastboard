import type { AddPageParams, PublicEvent, MountParams, NetlessApp } from "@netless/window-manager";
import type {
  AnimationMode,
  Camera,
  CameraState,
  Color,
  ConversionResponse,
  HotKey,
  HotKeys,
  JoinRoomParams,
  MemberState,
  Rectangle,
  Room,
  RoomPhase as RoomPhaseEnum,
  RoomCallbacks,
  RoomState,
  SceneDefinition,
  ShapeType,
  ViewCallbacks,
  WhiteWebSdkConfiguration,
  RoomMember,
  FloatBarOptions,
  ApplianceNames,
} from "white-web-sdk";
import type { SyncedStore, Storage, Diff, DiffOne } from "@netless/synced-store";

import { DefaultHotKeys, WhiteWebSdk, contentModeScale } from "white-web-sdk";
import { BuiltinApps, WindowManager } from "@netless/window-manager";
import { SyncedStorePlugin } from "@netless/synced-store";
import {
  getImageSize,
  genUID,
  convertedFileToScene,
  makeSlideParams,
  readable,
  writable,
  warn,
} from "../utils";
import { ensure_official_plugins, transform_app_status } from "../internal";
import { register } from "../behaviors/lite";

import { ApplianceMultiPlugin } from "@netless/appliance-plugin";
import type {
  AppliancePluginOptions,
  AppliancePluginInstance,
  ApplianceNames as ExtendApplianceNames,
  MemberState as ExtendMemberState,
  PublicEvent as AppliancePublicEvent,
  PublicListener as AppliancePublicListener,
} from "@netless/appliance-plugin";

import { AppInMainViewPlugin } from "@netless/app-in-mainview-plugin";
import type {
  AppInMainViewOptions,
  AppInMainViewInstance,
  PublicEvent as AppInMainViewPublicEvent,
  PublicListener as AppInMainViewPublicListener,
  AppId,
  AppValue,
} from "@netless/app-in-mainview-plugin";

function noop() {}

class FastboardAppBase<TEventData extends Record<string, any> = any> {
  public constructor(
    readonly sdk: WhiteWebSdk,
    readonly room: Room,
    readonly manager: WindowManager,
    readonly hotKeys: Partial<HotKeys>,
    readonly syncedStore: SyncedStore<TEventData>,
    readonly appliancePlugin?: AppliancePluginInstance,
    readonly appInMainViewPlugin?: AppInMainViewInstance
  ) {}

  protected _destroyed = false;
  /** @internal */
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("FastboardApp has been destroyed");
    }
  }

  /** @internal */
  protected _addRoomListener<K extends keyof RoomCallbacks>(name: K, listener: RoomCallbacks[K]) {
    if (this._destroyed) return noop;
    this.room.callbacks.on(name, listener);
    return () => this.room.callbacks.off(name, listener);
  }

  /** @internal */
  protected _addManagerListener<K extends keyof PublicEvent>(
    name: K,
    listener: (value: PublicEvent[K]) => void
  ) {
    if (this._destroyed) return noop;
    this.manager.emitter.on(name, listener);
    return () => this.manager.emitter.off(name, listener);
  }

  /** @internal */
  protected _addMainViewListener<K extends keyof ViewCallbacks>(name: K, listener: ViewCallbacks[K]) {
    if (this._destroyed) return noop;
    // Note: the callbacks will be invalid when reconnected, need rebind manually.
    this.manager.mainView.callbacks.on(name, listener);
    return () => this.manager.mainView.callbacks.off(name, listener);
  }

  /** @internal */
  protected _addApplianceListener<K extends AppliancePublicEvent>(
    name: K,
    listener: AppliancePublicListener[K]
  ) {
    if (this._destroyed || !this.appliancePlugin) return noop;
    this.appliancePlugin.addListener(name, listener);
    return () => this.appliancePlugin?.removeListener(name, listener);
  }

  /** @internal */
  protected _addAppInMainViewListener<K extends AppInMainViewPublicEvent>(
    name: K,
    listener: AppInMainViewPublicListener[K]
  ) {
    if (this._destroyed || !this.appInMainViewPlugin) return noop;
    this.appInMainViewPlugin.addListener(name, listener);
    return () => this.appInMainViewPlugin?.removeListener(name, listener);
  }

  /**
   * Destroy fastboard (disconnect from the whiteboard room).
   */
  public async destroy() {
    this._destroyed = true;
    this.manager.destroy();
    this.appliancePlugin?.destroy();
    this.appInMainViewPlugin?.destroy();
    await this.room.disconnect().catch(console.warn);
  }
}

type RoomPhase = `${RoomPhaseEnum}`;

export type {
  AddPageParams,
  AnimationMode,
  ApplianceNames,
  Camera,
  CameraState,
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
  ExtendApplianceNames,
  ExtendMemberState,
};

/** pencil, eraser, rectangle... */
export type Appliance = `${ExtendApplianceNames}`;
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

export type InsertDocsParams = InsertDocsStatic | InsertDocsDynamic;

export interface ProjectorResponse {
  uuid: string;
  status: "Waiting" | "Converting" | "Finished" | "Fail";
  type: "dynamic" | "static";
  /** 0..100 */
  convertedPercentage: number;
  /** https://example.org/path/to/{static,dynamic}Convert */
  prefix?: string;
  pageCount?: number;
  /** {1:"{prefix}/{taskId}/preview/1.png"}, only when type=dynamic and preview=true */
  previews?: Record<number, string>;
  /** {prefix}/{taskId}/jsonOutput/note.json */
  note?: string;
  /** {1:{width,height,url}}, only when type=static */
  images?: Record<number, { width: number; height: number; url: string }>;
  /** 20xxxxx */
  errorCode?: string;
  errorMessage?: string;
}

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

export class FastboardApp<TEventData extends Record<string, any> = any> extends FastboardAppBase<TEventData> {
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
    set => {
      set(this.room.isWritable);
      return this._addRoomListener("onEnableWriteNowChanged", () => set(this.room.isWritable));
    },
    this.room.setWritable.bind(this.room)
  );

  /**
   * Is current room online?
   */
  readonly phase = readable<RoomPhase>(this.room.phase, set => {
    set(this.room.phase);
    return this._addRoomListener("onPhaseChanged", set);
  });

  /**
   * Current window-manager's windows' state (is it maximized?).
   */
  readonly boxState = readable(this.manager.boxState, set => {
    set(this.manager.boxState);
    return this._addManagerListener("boxStateChange", set);
  });

  /**
   * Current window-manager's focused app's id.
   * @example "HelloWorld-1A2b3C4d"
   */
  readonly focusedApp = readable(this.manager.focused, set => {
    set(this.manager.focused);
    return this._addManagerListener("focusedChange", set);
  });

  /**
   * How many times can I call `app.redo()`?
   */
  readonly canRedoSteps = readable(this.manager.canRedoSteps, set => {
    set(this.manager.canRedoSteps);
    return this._addManagerListener("canRedoStepsChange", set);
  });

  /**
   * How many times can I call `app.undo()`?
   */
  readonly canUndoSteps = readable(this.manager.canUndoSteps, set => {
    set(this.manager.canUndoSteps);
    return this._addManagerListener("canUndoStepsChange", set);
  });

  /**
   * Current camera information of main view.
   *
   * Change the camera position by `app.moveCamera()`.
   */
  readonly camera = readable(this.manager.cameraState, set => {
    set(this.manager.cameraState);
    return this._addManagerListener("cameraStateChange", set);
  });

  /**
   * Current tool's info, like "is using pencil?", "what color?".
   *
   * Change the tool by `app.setAppliance()`.
   */
  readonly memberState = readable(this.room.state.memberState, set => {
    set(this.room.state.memberState);
    return this._addRoomListener("onRoomStateChanged", ({ memberState: m }) => m && set(m));
  });

  /**
   * 0..n-1, current index of main view scenes.
   */
  readonly sceneIndex = writable(
    this.manager.mainViewSceneIndex,
    set => {
      set(this.manager.mainViewSceneIndex);
      return this._addManagerListener("mainViewSceneIndexChange", set);
    },
    this.manager.setMainViewSceneIndex.bind(this.manager)
  );

  /**
   * How many pages are in the main view?
   */
  readonly sceneLength = readable(this.manager.mainViewScenesLength, set => {
    set(this.manager.mainViewScenesLength);
    return this._addManagerListener("mainViewScenesLengthChange", set);
  });

  /** @internal */
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

  /** @internal */
  private _visibleApps: Set<AppId> = new Set();
  /**
   * visible Apps, when appInMainViewPlugin is not enabled, it will be empty.
   */
  readonly visibleApps = readable<Set<AppId>>(this._visibleApps, set => {
    if (!this.appInMainViewPlugin) {
      set(this._visibleApps);
      return;
    }
    const apps = this.appInMainViewPlugin.currentPageVisibleApps;
    if (apps) {
      this._visibleApps = apps;
    }
    set(this._visibleApps);
    return this._addAppInMainViewListener("appMenuChange", (apps: Map<AppId, AppValue>) => {
      this._visibleApps = new Set(
        [...apps.entries()].filter(([_, { status }]) => status === "visible").map(([appId]) => appId)
      );
      set(this._visibleApps);
    });
  });

  /**
   * Returns `writable && phase === "connected"`.
   */
  get canOperate(): boolean {
    return this.room.isWritable && this.room.phase === "connected";
  }

  /**
   * Undo a step on main view.
   */
  undo() {
    this._assertNotDestroyed();
    if (this.appliancePlugin) {
      this.appliancePlugin.undo();
      return;
    }
    this.manager.undo();
  }

  /**
   * Redo a step on main view.
   */
  redo() {
    this._assertNotDestroyed();
    if (this.appliancePlugin) {
      this.appliancePlugin.redo();
      return;
    }
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
  setAppliance(appliance: ExtendApplianceNames | Appliance, shape?: ShapeType | Shape) {
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

  /**
   * Toggle dotted line effect on pencil.
   */
  toggleDottedLine(force?: boolean) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ dottedLine: force ?? !this.memberState.value.dottedLine });
  }

  /**
   * Set pencil eraser size.
   */
  setPencilEraserSize(size: number) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ pencilEraserSize: size });
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
   * Goto any page (index range: 0..n-1)
   */
  jumpPage(index: number) {
    this._assertNotDestroyed();
    return this.manager.jumpPage(index);
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
   * @param crossOrigin Whether to load the image with CORS enabled, default is `true`.
   *
   * @example
   * insertImage("https://i.imgur.com/CzXTtJV.jpg")
   */
  async insertImage(url: string, crossOrigin?: boolean | string) {
    this._assertNotDestroyed();
    await this.manager.switchMainViewToWriter();

    const { divElement } = this.manager.mainView;
    const containerSize = {
      width: divElement?.scrollWidth || window.innerWidth,
      height: divElement?.scrollHeight || window.innerHeight,
    };

    // 1. shrink the image a little to fit container **width**
    const maxWidth = containerSize.width * 0.8;
    let { width, height } = await getImageSize(url, containerSize, crossOrigin);
    const scale = Math.min(maxWidth / width, 1);
    const uuid = genUID();
    const { centerX, centerY } = this.manager.camera;
    width *= scale;
    height *= scale;
    const obj = this.appliancePlugin || this.manager.mainView;
    obj.insertImage({
      uuid,
      centerX,
      centerY,
      width,
      height,
      locked: false,
      crossOrigin,
    });
    obj.completeImageUpload(uuid, url);

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
    } else if (arg2 && arg2.images) {
      const title = arg1;
      const scenePath = `/${arg2.uuid}/${genUID()}`;
      const scenes: SceneDefinition[] = [];
      for (const name in arg2.images) {
        const { width, height, url } = arg2.images[name];
        scenes.push({ name, ppt: { width, height, src: url } });
      }
      return this._insertDocsImpl({ fileType: "pdf", scenePath, scenes, title });
    } else if (arg2 && arg2.prefix) {
      const title = arg1;
      const scenePath = `/${arg2.uuid}/${genUID()}`;
      const taskId = arg2.uuid;
      const url = arg2.prefix;
      this._insertDocsImpl({ fileType: "pptx", scenePath, taskId, title, url });
    } else {
      throw new Error("Invalid input: not found 'progress', 'prefix' nor 'images'");
    }
  }

  /** @internal */
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
   * Insert the Monaco Code Editor app.
   * @deprecated Use `app.manager.addApp({ kind: 'Monaco' })` instead.
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
   * @deprecated Use `app.manager.addApp({ kind: 'Countdown' })` instead.
   */
  insertCountdown() {
    this._assertNotDestroyed();
    return this.manager.addApp({
      kind: "Countdown",
      options: { title: "Countdown" },
    });
  }

  /**
   * Insert the GeoGebra app.
   * @deprecated Use `app.manager.addApp({ kind: 'GeoGebra' })` instead.
   */
  insertGeoGebra() {
    this._assertNotDestroyed();
    return this.manager.addApp({
      kind: "GeoGebra",
      options: { title: "GeoGebra" },
    });
  }

  override async destroy() {
    await super.destroy();
    this.phase.dispose("disconnected");
    this.writable.dispose(false);
  }
}

export interface FastboardOptions {
  sdkConfig: Omit<WhiteWebSdkConfiguration, "useMobXState"> & {
    region: NonNullable<WhiteWebSdkConfiguration["region"]>;
  };
  joinRoom: Omit<JoinRoomParams, "useMultiViews" | "disableNewPencil" | "disableMagixEventDispatchLimit"> & {
    callbacks?: Partial<Omit<RoomCallbacks, "onCanRedoStepsUpdate" | "onCanUndoStepsUpdate">>;
  };
  managerConfig?: Omit<MountParams, "room">;
  netlessApps?: NetlessApp[];
  enableAppliancePlugin?: AppliancePluginOptions;
  enableAppInMainViewPlugin?: true | AppInMainViewOptions;
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
export async function createFastboard<TEventData extends Record<string, any> = any>({
  sdkConfig,
  joinRoom: { callbacks, ...joinRoomParams },
  managerConfig,
  netlessApps,
  enableAppliancePlugin,
  enableAppInMainViewPlugin,
}: FastboardOptions) {
  const isEnableAppliancePlugin =
    enableAppliancePlugin?.cdn.fullWorkerUrl && enableAppliancePlugin?.cdn.subWorkerUrl ? true : false;

  const joinRoomParamsWithPlugin = ensure_official_plugins(joinRoomParams);
  if (isEnableAppliancePlugin) {
    if (joinRoomParamsWithPlugin.invisiblePlugins) {
      joinRoomParamsWithPlugin.invisiblePlugins = [
        ...joinRoomParamsWithPlugin.invisiblePlugins,
        ApplianceMultiPlugin,
      ];
    }
    if (managerConfig) {
      managerConfig.supportAppliancePlugin = true;
    }
  }
  if (enableAppInMainViewPlugin && joinRoomParamsWithPlugin.invisiblePlugins) {
    joinRoomParamsWithPlugin.invisiblePlugins = [
      ...joinRoomParamsWithPlugin.invisiblePlugins,
      AppInMainViewPlugin,
    ];
  }

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
      hotKeys,
      ...joinRoomParamsWithPlugin,
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
  let appInMainViewPluginInstance: AppInMainViewInstance | undefined;
  if (enableAppInMainViewPlugin) {
    appInMainViewPluginInstance = await AppInMainViewPlugin.getInstance(
      manager,
      enableAppInMainViewPlugin === true ? undefined : enableAppInMainViewPlugin
    );
  }
  let appliancePluginInstance: AppliancePluginInstance | undefined;
  if (isEnableAppliancePlugin && enableAppliancePlugin) {
    appliancePluginInstance = await ApplianceMultiPlugin.getInstance(manager, {
      options: enableAppliancePlugin,
    });
  }
  if (room.isWritable && ((room as any).floatBarOptions as FloatBarOptions)?.colors.length) {
    const colors = (room as any).floatBarOptions?.colors;
    const length = colors.length;
    (room as any).getRoomMembers().map((c: RoomMember) => {
      const index = c.memberId % length;
      const color = colors[index];
      manager.mainView.setMemberState({
        strokeColor: color,
        textColor: color,
      });
    });
  }
  manager.mainView.setCameraBound({
    minContentMode: contentModeScale(0.3),
    maxContentMode: contentModeScale(3),
  });

  return new FastboardApp<TEventData>(
    sdk,
    room,
    manager,
    hotKeys,
    syncedStore,
    appliancePluginInstance,
    appInMainViewPluginInstance
  );
}
