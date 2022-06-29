import type {
  ApplianceNames,
  AppsStatus,
  CameraState,
  FastboardApp,
  MemberState,
  ShapeType,
} from "@netless/fastboard-core";
import type { Readable } from "svelte/store";
import { derived, get, writable } from "svelte/store";

export interface MockApp {
  redo_undo: Readable<{ redo: number; undo: number }>;
  commit: () => void;
}

export function mockApp(): [app: FastboardApp, mock: MockApp] {
  const writable_ = writable(true);
  const undoSteps = writable(0);
  const redoSteps = writable(0);
  const memberState = writable<MemberState>({
    currentApplianceName: "pencil" as ApplianceNames.pencil,
    strokeColor: [255, 0, 0],
    strokeWidth: 2,
    textColor: [255, 0, 0],
    textSize: 16,
  });
  const pageIndex = writable(0);
  const pageLength = writable(15);
  const camera = writable<CameraState>({ centerX: 0, centerY: 0, scale: 1, width: 0, height: 0 });
  const appsStatus = writable<AppsStatus>({});

  // function simulateLoadingApp(key: string, should_fail = false) {
  //   setTimeout(() => {
  //     appsStatus.update(e => ({ ...e, [key]: { status: 'loading' } }))
  //     setTimeout(() => {
  //       appsStatus.update(e =>
  //         should_fail
  //           ? { ...e, [key]: { status: 'failed', reason: 'Failed to load script.' } }
  //           : { ...e, [key]: { status: 'idle' } },
  //       )
  //       console.log('simulate insert app', key, should_fail ? 'fail' : 'success')
  //     }, 3000)
  //   })
  // }

  const app = {
    manager: {
      setPrefersColorScheme(scheme) {
        console.log("setPrefersColorScheme", scheme);
      },
    },
    bindContainer(el) {
      el.style.cssText = "display: flex; align-items: center; justify-content: center;";
      el.textContent = "whiteboard container";
    },
    writable: writable_,
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
    pageIndex,
    pageLength: {
      subscribe: pageLength.subscribe,
    },
    prevPage() {
      pageIndex.update(e => Math.max(0, e - 1));
      return Promise.resolve(true);
    },
    nextPage() {
      pageIndex.update(e => Math.min(e + 1, get(pageLength) - 1));
      return Promise.resolve(true);
    },
    addPage({ after = false } = {}) {
      pageLength.update(e => e + 1);
      after && this.nextPage();
      return Promise.resolve();
    },
    setAppliance(appliance, shape) {
      memberState.update(e => ({
        ...e,
        currentApplianceName: appliance as ApplianceNames,
        shapeType: appliance === "shape" ? (shape as ShapeType) : undefined,
      }));
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
    setPencilEraserSize(size: number) {
      console.log("setPencilEraserSize", size);
      memberState.update(e => ({ ...e, pencilEraserSize: size }));
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

  return [app as unknown as FastboardApp, mock];
}
