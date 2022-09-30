import type { Disposer, Readable, StartStopNotifier, Writable } from "./store";
import type {
  AddPageParams,
  AnimationMode,
  ApplianceNames,
  Camera,
  CameraState,
  Color,
  ConversionResponse,
  ConvertedFile,
  HotKeys,
  JoinRoomParams,
  MemberState,
  MountParams,
  NetlessApp,
  PageState,
  PublicEvent,
  Room,
  RoomCallbacks,
  RoomPhase,
  SceneDefinition,
  ShapeType,
  SyncedStore,
  WhiteWebSdkConfiguration,
} from "./typings";

import { v4 } from "@lukeed/uuid";
import { SyncedStorePlugin } from "@netless/synced-store";
import { BuiltinApps, WindowManager } from "@netless/window-manager";
import { DefaultHotKeys, WhiteWebSdk } from "white-web-sdk";
import { ensureNetlessUA } from "./behaviors/netless-ua";
import { addManagerListener, addRoomListener, ensureOfficialPlugins } from "./helpers";
import { createVal } from "./store";

// The inheritance is for simplifying the code, so that we can use
// `prop = f(this.room)` directly in its child class.
class FastboardAppStruct<TEventData extends Record<string, any> = any> {
  // Intensionally not class-field to prevent `__publicField` usage.
  protected declare _disposers: Disposer[];
  protected declare _destroyed: boolean;
  protected _assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("FastboardApp has been destroyed");
    }
  }
  protected _flushAllDisposers() {
    this._disposers.forEach(disposer => disposer());
    this._disposers = [];
  }

  constructor(
    readonly sdk: WhiteWebSdk,
    readonly room: Room,
    readonly manager: WindowManager,
    readonly syncedStore: SyncedStore<TEventData>,
    readonly hotKeys: Partial<HotKeys>
  ) {
    this._disposers = [];
    this._destroyed = false;
  }

  /** @internal */
  protected _val<T>(init: T, start: StartStopNotifier<T>): Readable<T>;
  /** @internal */
  protected _val<T>(init: T, start: StartStopNotifier<T>, setter: (value: T) => void): Writable<T>;
  protected _val<T>(init: T, start: StartStopNotifier<T>, setter?: (value: T) => void) {
    const val = createVal(init, start, setter as (value: T) => void);
    this._disposers.push(val.dispose.bind(val));
    return val;
  }
}

export class FastboardApp<
  TEventData extends Record<string, any> = any
> extends FastboardAppStruct<TEventData> {
  constructor(
    sdk: WhiteWebSdk,
    room: Room,
    manager: WindowManager,
    syncedStore: SyncedStore<TEventData>,
    hotKeys: Partial<HotKeys>
  ) {
    super(sdk, room, manager, syncedStore, hotKeys);

    // Guard `app.destroy()` so that network errors won't break fastboard.
    this._disposers.push(
      addRoomListener(this.room, "onDisconnectWithError", error => {
        console.warn("FastboardApp was disconnected with error.");
        console.error(error);
        this._destroyed = true;
        this._flushAllDisposers();
        this.manager.destroy();
      })
    );
  }

  /**
   * Disconnect from whiteboard room.
   */
  async destroy(): Promise<void> {
    if (this._destroyed) return;
    this._destroyed = true;
    this._flushAllDisposers();
    this.manager.destroy();
    await this.room.disconnect();
  }

  /**
   * Render this app to some DOM.
   */
  bindContainer(container: HTMLElement) {
    this._assertNotDestroyed();
    this.manager.bindContainer(container);
  }

  /**
   * Is current room writable?
   */
  readonly writable = this._val(
    this.room.isWritable,
    set => addRoomListener(this.room, "onEnableWriteNowChanged", () => set(this.room.isWritable)),
    writable => this.room.setWritable(writable)
  );

  /**
   * Is current room online?
   */
  readonly phase = this._val<RoomPhase>(this.room.phase, set =>
    addRoomListener(this.room, "onPhaseChanged", set)
  );

  /**
   * Current user's state, including 'strokeColor', etc.
   *
   * To change the tool, use `fastboard.setAppliance('pencil')`.
   */
  readonly memberState = this._val<MemberState>(this.room.state.memberState, set =>
    addRoomListener(this.room, "onRoomStateChanged", state => {
      if (state.memberState) set(state.memberState);
    })
  );

  /**
   * Window manager's windows' state (is it maximized).
   */
  readonly boxState = this._val(this.manager.boxState, set =>
    addManagerListener(this.manager, "boxStateChange", set)
  );

  /**
   * Window manager's focused (at the top) app's id, like `HelloWorld-1A2b3C4d`.
   */
  readonly focusedApp = this._val(this.manager.focused, set =>
    addManagerListener(this.manager, "focusedChange", set)
  );

  /**
   * How many times can I call `fastboard.redo()`?
   */
  readonly canRedoSteps = this._val(this.manager.canRedoSteps, set =>
    addManagerListener(this.manager, "canRedoStepsChange", set)
  );

  /**
   * How many times can I call `fastboard.undo()`?
   */
  readonly canUndoSteps = this._val(this.manager.canUndoSteps, set =>
    addManagerListener(this.manager, "canUndoStepsChange", set)
  );

  /**
   * The synced camera state across all users.
   */
  readonly baseCamera = this._val(this.manager.baseCamera, set =>
    addManagerListener(this.manager, "baseCameraChange", set)
  );

  /**
   * The local camera state of main view in window manager.
   *
   * Change the camera position by `fastboard.moveCamera()`.
   */
  readonly camera = this._val<CameraState>(this.manager.cameraState, set =>
    addManagerListener(this.manager, "cameraStateChange", set)
  );

  /**
   * Forward manager.pageState.
   */
  readonly pageState = this._val<PageState>(this.manager.pageState, set =>
    addManagerListener(this.manager, "pageStateChange", set)
  );

  /**
   * 0..n-1, current index of pages.
   */
  readonly pageIndex = this._val(
    this.pageState.value.index,
    set => this.pageState.reaction(state => set(state.index)),
    index => this.jumpPage(index)
  );

  /**
   * How many pages are there in the main view?
   */
  readonly pageLength = this._val(this.pageState.value.length, set =>
    this.pageState.reaction(state => set(state.length))
  );

  /** @internal */
  private _appsStatus: AppsStatus = {};

  /**
   * Apps loading status.
   */
  readonly appsStatus = this._val<AppsStatus>({}, set =>
    addManagerListener(this.manager, "loadApp", ({ kind, status, reason }) => {
      this._appsStatus[kind] = { status: load_app_event_to_status(status), reason };
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
   * Move main view's camera.
   */
  moveCamera(camera: Partial<Camera> & { animationMode?: AnimationMode }) {
    this._assertNotDestroyed();
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
   * Set current tool, like `pencil`.
   */
  setAppliance(appliance: ApplianceNames | `${ApplianceNames}`, shape?: ShapeType | `${ShapeType}`) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({
      currentApplianceName: appliance as ApplianceNames,
      shapeType: shape as ShapeType,
    });
  }

  /**
   * Set pencil and shape's thickness.
   */
  setStrokeWidth(width: number) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeWidth: width });
  }

  /**
   * Set pencil and shape's color.
   */
  setStrokeColor(color: Color) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeColor: color });
  }

  /**
   * Set text size. Default is 16.
   */
  setTextSize(size: number) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ textSize: size });
  }

  /**
   * Set text color.
   */
  setTextColor(color: Color) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({ textColor: color });
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
   * Toggle text can be selected in text editing mode.
   */
  toggleTextCanSelectText(force?: boolean) {
    this._assertNotDestroyed();
    this.manager.mainView.setMemberState({
      textCanSelectText: force ?? !this.memberState.value.textCanSelectText,
    });
  }

  /**
   * Goto previous page, returns true if success.
   */
  prevPage() {
    this._assertNotDestroyed();
    return this.manager.prevPage();
  }

  /**
   * Goto next page, returns true if success.
   */
  nextPage() {
    this._assertNotDestroyed();
    return this.manager.nextPage();
  }

  /**
   * Add one page to the main whiteboard view.
   * ```js
   * fastboard.addPage({ after: true }) // add one page right after current page
   * fastboard.nextPage() // then, goto that page
   * ```
   */
  addPage(params?: AddPageParams) {
    this._assertNotDestroyed();
    return this.manager.addPage(params);
  }

  /**
   * Remove one page at given index or current page (by default).
   */
  removePage(index?: number) {
    this._assertNotDestroyed();
    return this.manager.removePage(index);
  }

  /**
   * Jump to specific page.
   */
  jumpPage(index: number) {
    this._assertNotDestroyed();
    return this.manager.jumpPage(index);
  }

  /**
   * Insert an image to the main view.
   */
  async insertImage(url: string, options: InsertImageOptions = {}) {
    this._assertNotDestroyed();
    let { width, height } = options;
    // If user does not provide size, we get the real size through <img> element.
    if (!width || !height) {
      const size = await new Promise<{ width: number; height: number }>(resolve => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve({ width: 0, height: 0 });
        image.src = url;
      });
      width = size.width;
      height = size.height;
    }
    const { divElement } = this.manager.mainView;
    const containerSize = {
      width: divElement?.scrollWidth || innerWidth || 100,
      height: divElement?.scrollHeight || innerHeight || 100,
    };
    // If fetch image failed, maybe there's CORS, fallback to use container size.
    if (!width || !height) {
      width = containerSize.width;
      height = containerSize.height;
    }
    // Get the position, default to the center of whiteboard.
    const { centerX = 0, centerY = 0 } = options;
    // Now we do real insertion.
    const maxWidth = containerSize.width * 0.8;
    const scale = Math.min(maxWidth / width, 1);
    const uuid = v4();
    width *= scale;
    height *= scale;
    const { locked = false, uniformScale } = options;
    this.manager.mainView.insertImage({ uuid, centerX, centerY, width, height, locked, uniformScale });
    this.manager.mainView.completeImageUpload(uuid, url);
    // Move camera to fit image height.
    this.moveCamera({ centerX, centerY, scale: containerSize.height / (height + 32) });
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
   * fastboard.insertDocs({
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
      const scenePath = `/${arg2.uuid}/${v4()}`;
      const scenes1 = arg2.progress.convertedFileList.map(converted_file_to_scene);
      const { scenes, taskId, url } = make_slide_params(scenes1);
      if (taskId && url) {
        return this._insertDocsImpl({ fileType: "pptx", scenePath, scenes, title, taskId, url });
      } else {
        return this._insertDocsImpl({ fileType: "pdf", scenePath, scenes: scenes1, title });
      }
    } else if (arg2 && "prefix" in arg2) {
      const title = arg1;
      const scenePath = `/${arg2.uuid}/${v4()}`;
      const taskId = arg2.uuid;
      const url = arg2.prefix;
      return this._insertDocsImpl({ fileType: "pptx", scenePath, taskId, title, url });
    }
  }

  /** @internal */
  private _insertDocsImpl({ fileType, scenePath, title, scenes, ...attributes }: InsertDocsParams) {
    this._assertNotDestroyed();
    switch (fileType) {
      case "pdf":
        return this.manager.addApp({
          kind: BuiltinApps.DocsViewer,
          options: { scenePath, title, scenes },
        });
      case "pptx":
        if (scenes && scenes[0].ppt) {
          console.warn("There shouldn't be scenes[].ppt in pptx params.");
        }
        if (!WindowManager.registered.has("Slide")) {
          console.warn("You haven't register @netless/app-slide.");
        }
        return this.manager.addApp({
          kind: "Slide",
          options: { scenePath, title },
          attributes,
        });
    }
  }
}

export interface AppsStatus {
  [kind: string]: {
    status: "idle" | "loading" | "failed";
    /** Exist if status is `failed` */
    reason?: string;
  };
}

export interface InsertImageOptions {
  /** Image width, in pixel */
  width?: number;
  /** Image height, in pixel */
  height?: number;
  /** Image position, in pixel, default as 0 */
  centerX?: number;
  /** Image position, in pixel, default as 0 */
  centerY?: number;
  /** Whether to disable moving, default is false */
  locked?: boolean;
  /** Whether to keep ratio */
  uniformScale?: boolean;
}

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
  /** Where the slide resource placed. default: `https://convertcdn.netless.link/dynamicConvert` */
  readonly url?: string;
  /** @example [{ name: '1' }, { name: '2' }, { name: '3' }] */
  readonly scenes?: SceneDefinition[];
}

export type InsertDocsParams = InsertDocsStatic | InsertDocsDynamic;

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

function load_app_event_to_status(status: PublicEvent["loadApp"]["status"]) {
  return status === "start" ? "loading" : status === "failed" ? "failed" : "idle";
}

function converted_file_to_scene(f: ConvertedFile, i: number): SceneDefinition {
  return {
    name: String(i + 1),
    ppt: {
      src: f.conversionFileUrl,
      width: f.width,
      height: f.height,
      previewURL: f.preview,
    },
  };
}

function make_slide_params(scenes: SceneDefinition[]) {
  let taskId = "";
  let url = "";

  // e.g. "ppt(x)://cdn/prefix/dynamicConvert/{taskId}/1.slide"
  const pptSrcRE = /^pptx?(?<prefix>:\/\/\S+?dynamicConvert)\/(?<taskId>\w+)\//;

  for (const { ppt } of scenes) {
    if (!ppt || !ppt.src.startsWith("ppt")) {
      continue;
    }
    const match = pptSrcRE.exec(ppt.src);
    if (!match || !match.groups) {
      continue;
    }
    taskId = match.groups.taskId;
    url = "https" + match.groups.prefix;
    break;
  }

  const emptyScenes = scenes.map(s => ({ name: s.name }));

  return { scenes: emptyScenes, taskId, url };
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
}

export async function createFastboardCore<TEventData extends Record<string, any> = any>({
  sdkConfig,
  joinRoom: { callbacks, ...joinRoomParams },
  managerConfig,
  netlessApps,
}: FastboardOptions) {
  ensureNetlessUA();

  const sdk = new WhiteWebSdk({ ...sdkConfig, useMobXState: true });

  const hotKeys = joinRoomParams.hotKeys || {
    ...DefaultHotKeys,
    changeToSelector: "s",
    changeToLaserPointer: "z",
    changeToPencil: "p",
    changeToRectangle: "r",
    changeToEllipse: "c",
    changeToPencilEraser: "e",
    changeToEraser: { key: "E", shiftKey: true, altKey: false, ctrlKey: false },
    changeToText: "t",
    changeToStraight: "l",
    changeToArrow: "a",
    changeToHand: "h",
  };

  if (netlessApps) {
    netlessApps.forEach(app => WindowManager.register({ kind: app.kind, src: app }));
  }

  const room = await sdk.joinRoom(
    {
      floatBar: true,
      disableEraseImage: true,
      hotKeys,
      ...ensureOfficialPlugins(joinRoomParams),
      useMultiViews: true,
      disableNewPencil: false,
      disableMagixEventDispatchLimit: true,
    },
    callbacks
  );

  const syncedStore = await SyncedStorePlugin.init<TEventData>(room);

  const manager = await WindowManager.mount({ cursor: true, ...managerConfig, room });

  return new FastboardApp<TEventData>(sdk, room, manager, syncedStore, hotKeys);
}
