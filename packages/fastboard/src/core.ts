import type { PublicEvent, Room, WindowManager } from "@netless/window-manager";
import type {
  AnimationMode,
  ApplianceNames,
  Camera,
  Color,
  ConversionResponse,
  HotKeys,
  MemberState,
  Rectangle,
  RoomState,
  SceneDefinition,
  ShapeType,
  WhiteWebSdk,
} from "white-web-sdk";
import type { FastboardDisposer, FastboardInternalValue } from "./value";

import { BuiltinApps } from "@netless/window-manager";
import { createValue } from "./value";
import { makeSlideParams, genUID } from "./utils";

export interface FastboardAppParams {
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
  readonly scenes?: SceneDefinition[];
}

export interface InsertMediaParams {
  title: string;
  src: string;
}

export type InsertDocsParams = InsertDocsStatic | InsertDocsDynamic;

export class FastboardApp {
  private readonly _disposers: FastboardDisposer[] = [];
  private _destroyed = false;

  constructor(
    readonly sdk: WhiteWebSdk,
    readonly room: Room,
    readonly manager: WindowManager,
    readonly hotKeys: Partial<HotKeys>
  ) {}

  private assertNotDestroyed() {
    if (this._destroyed) {
      throw new Error("[FastboardApp] Can not call any method on destroyed FastboardApp.");
    }
  }

  bindContainer(container: HTMLElement) {
    this.assertNotDestroyed();
    this.manager.bindContainer(container);
  }

  bindCollector(container: HTMLElement) {
    this.assertNotDestroyed();
    this.manager.bindCollectorContainer(container);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private createValue: typeof createValue = (...args: any): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (createValue as any)(...args);
    this._disposers.push((value as FastboardInternalValue<unknown>).dispose);
    return value;
  };

  private _addRoomListener(name: string, listener: unknown) {
    this.assertNotDestroyed();
    this.room.callbacks.on(name, listener);
    return () => this.room.callbacks.off(name, listener);
  }

  private _addManagerListener<K extends keyof PublicEvent>(name: K, set: (value: PublicEvent[K]) => void) {
    this.assertNotDestroyed();
    this.manager.emitter.on(name, set);
    return () => this.manager.emitter.off(name, set);
  }

  private _addMainViewListener(name: string, listener: unknown) {
    this.assertNotDestroyed();
    this.manager.mainView.callbacks.on(name, listener);
    return () => this.manager.mainView.callbacks.off(name, listener);
  }

  readonly writable = this.createValue(
    this.room.isWritable,
    set => this._addRoomListener("onEnableWriteNowChanged", () => set(this.room.isWritable)),
    this.room.setWritable.bind(this.room)
  );

  readonly boxState = this.createValue(this.manager.boxState, set =>
    this._addManagerListener("boxStateChange", set)
  );

  readonly focusedApp = this.createValue(this.manager.focused, set =>
    this._addManagerListener("focusedChange", set)
  );

  readonly canRedoSteps = this.createValue(this.manager.mainView.canRedoSteps, set =>
    this._addMainViewListener("onCanRedoStepsUpdate", set)
  );

  readonly canUndoSteps = this.createValue(this.manager.mainView.canUndoSteps, set =>
    this._addMainViewListener("onCanUndoStepsUpdate", set)
  );

  readonly camera = this.createValue(
    this.manager.mainView.camera,
    set => this._addMainViewListener("onCameraUpdated", set),
    this.manager.moveCamera.bind(this.manager)
  );

  readonly memberState = this.createValue<MemberState, (partialMemberState: Partial<MemberState>) => void>(
    this.room.state.memberState,
    set =>
      this._addRoomListener(
        "onRoomStateChanged",
        ({ memberState }: { memberState?: RoomState["memberState"] }) => memberState && set(memberState)
      ),
    this.manager.mainView.setMemberState.bind(this.manager.mainView)
  );

  destroy() {
    this._disposers.forEach(dispose => dispose());
    this._disposers.length = 0;
    this._destroyed = true;
    this.manager.destroy();
    return this.room.disconnect();
  }

  undo() {
    this.assertNotDestroyed();
    this.manager.mainView.undo();
  }

  redo() {
    this.assertNotDestroyed();
    this.manager.mainView.redo();
  }

  moveCamera(camera: Partial<Camera> & { animationMode?: AnimationMode | undefined }) {
    this.assertNotDestroyed();
    this.manager.moveCamera(camera);
  }

  moveCameraToContain(rectangle: Rectangle & { animationMode?: AnimationMode }) {
    this.assertNotDestroyed();
    this.manager.moveCameraToContain(rectangle);
  }

  cleanCurrentScene() {
    this.assertNotDestroyed();
    this.manager.mainView.cleanCurrentScene();
  }

  setAppliance(appliance: ApplianceNames, shape?: ShapeType) {
    this.assertNotDestroyed();
    this.manager.mainView.setMemberState({ currentApplianceName: appliance, shapeType: shape });
  }

  setStrokeWidth(strokeWidth: number) {
    this.assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeWidth });
  }

  setStrokeColor(strokeColor: Color) {
    this.assertNotDestroyed();
    this.manager.mainView.setMemberState({ strokeColor });
  }

  /**
   * Insert PDF/PPTX from conversion result.
   * @param status https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress
   */
  insertDocs(filename: string, status: ConversionResponse): Promise<string | undefined>;

  /**
   * Manual way.
   */
  insertDocs(params: InsertDocsParams): Promise<string | undefined>;

  insertDocs(arg1: string | InsertDocsParams, arg2?: ConversionResponse) {
    if (typeof arg1 === "object" && "fileType" in arg1) {
      return this._insertDocsImpl(arg1);
    } else if (arg2 && arg2.status !== "Finished") {
      throw new Error("[FastboardApp] Can not insert a converting doc.");
    } else if (arg2 && arg2.progress) {
      const scenes: SceneDefinition[] = arg2.progress.convertedFileList.map((f, i) => ({
        name: String(i + 1),
        ppt: {
          src: f.conversionFileUrl,
          width: f.width,
          height: f.height,
          previewURL: f.preview,
        },
      }));
      const uid = genUID();
      const scenePath = `/${arg2.uuid}/${uid}`;
      const { scenesWithoutPPT, taskId, url } = makeSlideParams(scenes);
      if (taskId && url) {
        return this._insertDocsImpl({
          fileType: "pptx",
          scenePath,
          taskId,
          title: arg1,
          url,
          scenes: scenesWithoutPPT,
        });
      } else {
        return this._insertDocsImpl({
          fileType: "pdf",
          scenePath,
          scenes,
          title: arg1,
        });
      }
    }
  }

  private _insertDocsImpl(params: InsertDocsParams) {
    this.assertNotDestroyed();
    switch (params.fileType) {
      case "pdf":
      case "ppt":
        return this.manager.addApp({
          kind: "DocsViewer",
          options: {
            scenePath: params.scenePath,
            title: params.title,
            scenes: params.scenes,
          },
        });
      case "pptx":
        return this.manager.addApp({
          kind: "Slide",
          options: {
            scenePath: params.scenePath,
            title: params.title,
            scenes: params.scenes,
          },
          attributes: {
            taskId: params.taskId,
            url: params.url,
          },
        });
    }
  }

  insertCodeEditor() {
    this.assertNotDestroyed();
    return this.manager.addApp({
      kind: "Monaco",
      options: { title: "Code Editor" },
    });
  }

  insertCountdown() {
    this.assertNotDestroyed();
    return this.manager.addApp({
      kind: "Countdown",
      options: { title: "Countdown" },
    });
  }

  insertMedia({ title, src }: InsertMediaParams) {
    this.assertNotDestroyed();
    return this.manager.addApp({
      kind: BuiltinApps.MediaPlayer,
      options: { title },
      attributes: { src },
    });
  }

  insertGeoGebra() {
    this.assertNotDestroyed();
    return this.manager.addApp({
      kind: "GeoGebra",
      options: { title: "GeoGebra" },
    });
  }
}
