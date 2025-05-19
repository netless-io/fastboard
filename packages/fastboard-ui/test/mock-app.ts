import type {
  RoomPhase,
  ApplianceNames,
  AppsStatus,
  CameraState,
  FastboardApp,
  ShapeType,
} from "@netless/fastboard-core";
import type { MemberState } from "@netless/appliance-plugin";
import type { Readable } from "svelte/store";
import type { PartialDeep } from "type-fest";
import { derived, get, writable } from "svelte/store";

export interface MockApp {
  redo_undo: Readable<{ redo: number; undo: number }>;
  commit: () => void;
}

export function mockApp(): [app: FastboardApp, mock: MockApp] {
  const writable_ = writable(true);
  const phase = writable<RoomPhase>("connected");
  const undoSteps = writable(0);
  const redoSteps = writable(0);
  const memberState = writable<MemberState>({
    currentApplianceName: "pencil" as ApplianceNames.pencil,
    strokeColor: [255, 0, 0],
    strokeWidth: 2,
    textColor: [255, 0, 0],
    textSize: 16,
    strokeOpacity: 1,
    useLaserPen: false,
    pencilEraserSize: 3,
  }) as any;
  const sceneIndex = writable(0);
  const sceneLength = writable(15);
  const camera = writable<CameraState>({ centerX: 0, centerY: 0, scale: 1, width: 100, height: 100 });
  const appsStatus = writable<AppsStatus>({});

  function simulateLoadingApp(key: string, should_fail = false) {
    setTimeout(() => {
      appsStatus.update(e => ({ ...e, [key]: { status: "loading" } }));
      setTimeout(() => {
        appsStatus.update(e =>
          should_fail
            ? { ...e, [key]: { status: "failed", reason: "Failed to load script." } }
            : { ...e, [key]: { status: "idle" } }
        );
        console.log("simulate insert app", key, should_fail ? "fail" : "success");
      }, 3000);
    });
  }

  const app: PartialDeep<FastboardApp> = {
    appliancePlugin: {
      setMemberState(modifyState: Partial<MemberState>) {
        console.log("setMemberState", modifyState);
        memberState.update(e => ({
          ...e,
          ...modifyState,
        }));
      },
    },
    manager: {
      room: {
        floatBarOptions: {
          colors: [
            [50, 197, 255],
            [0, 145, 255],
            [98, 54, 255],
            [182, 32, 224],
            [109, 114, 120],
          ],
        },
      } as any,
      setPrefersColorScheme(scheme) {
        console.log("setPrefersColorScheme", scheme);
      },
      async addApp(args) {
        console.log("addApp", args);
        return "App-123";
      },
    },
    bindContainer(el) {
      el.style.cssText = "display: flex; align-items: center; justify-content: center;";
      el.textContent = "whiteboard container";
    },
    writable: writable_,
    phase,
    hotKeys: {
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
    },
    canRedoSteps: { subscribe: redoSteps.subscribe },
    canUndoSteps: { subscribe: undoSteps.subscribe },
    redo() {
      redoSteps.update(e => {
        e > 0 && undoSteps.update(e => e + 1);
        return Math.max(0, e - 1);
      });
    },
    undo() {
      undoSteps.update(e => {
        e > 0 && redoSteps.update(e => e + 1);
        return Math.max(0, e - 1);
      });
    },
    memberState: {
      subscribe: memberState.subscribe,
    },
    sceneIndex: sceneIndex,
    sceneLength: {
      subscribe: sceneLength.subscribe,
    },
    prevPage() {
      sceneIndex.update(e => Math.max(0, e - 1));
      return Promise.resolve(true);
    },
    nextPage() {
      sceneIndex.update(e => Math.min(e + 1, get(sceneLength) - 1));
      return Promise.resolve(true);
    },
    addPage({ after = false } = {}) {
      sceneLength.update(e => e + 1);
      after && this.nextPage();
      return Promise.resolve();
    },
    setAppliance(appliance, shape) {
      console.log("setAppliance", appliance, shape);
      if (appliance === "laserPen") {
        memberState.update(e => ({
          ...e,
          currentApplianceName: "pencil" as ApplianceNames,
          useLaserPen: true,
        }));
      } else {
        memberState.update(e => ({
          ...e,
          currentApplianceName: appliance as ApplianceNames,
          useLaserPen: false,
          shapeType: appliance === "shape" ? (shape as ShapeType) : undefined,
        }));
      }
    },
    setStrokeWidth(width: number) {
      console.log("setStrokeWidth", width);
      memberState.update(e => ({ ...e, strokeWidth: width }));
    },
    setStrokeColor(color: [number, number, number]) {
      console.log("setStrokeColor", color);
      memberState.update(e => ({ ...e, strokeColor: color }));
    },
    setTextColor(color: [number, number, number]) {
      console.log("setTextColor", color);
      memberState.update(e => ({ ...e, textColor: color }));
    },
    setTextSize(size: number) {
      console.log("setTextSize", size);
      memberState.update(e => ({ ...e, textSize: size }));
    },
    cleanCurrentScene() {
      console.log("cleanCurrentScene");
    },
    camera: {
      subscribe: camera.subscribe,
    },
    moveCamera(f) {
      camera.update(e => ({ ...e, ...f }));
    },
    insertCodeEditor() {
      console.log("insertCodeEditor");
      simulateLoadingApp("Monaco", true);
      return Promise.resolve("123");
    },
    insertGeoGebra() {
      console.log("insertGeoGebra");
      simulateLoadingApp("GeoGebra");
      return Promise.resolve("456");
    },
    insertCountdown() {
      console.log("insertCountdown");
      simulateLoadingApp("Countdown");
      return Promise.resolve("789");
    },
    appsStatus: { subscribe: appsStatus.subscribe },
  };

  const mock: MockApp = {
    redo_undo: derived([redoSteps, undoSteps], ([$redo, $undo]) => ({
      redo: $redo,
      undo: $undo,
    })),
    commit: () => {
      redoSteps.set(0);
      undoSteps.update(e => e + 1);
    },
  };

  return [app as FastboardApp, mock];
}
