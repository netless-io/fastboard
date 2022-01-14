import type { SceneDefinition } from "white-web-sdk";

export function noop() {
  return;
}

export function applyStyles(css: string) {
  const el = document.createElement("style");
  el.appendChild(document.createTextNode(css));
  document.head.appendChild(el);
  return el;
}

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function isEqualArray<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((e, i) => e === b[i]);
}

export type TaskFn = () => Promise<void> | void;

export class Lock {
  running = false;
  private nextFn: TaskFn | null = null;
  schedule(fn: TaskFn) {
    if (this.running) {
      this.nextFn = fn;
    } else {
      this.running = true;
      Promise.resolve(fn()).then(this.step);
    }
  }
  private step = () => {
    if (this.nextFn) {
      const fn = this.nextFn;
      this.nextFn = null;
      Promise.resolve(fn()).then(this.step);
    } else {
      this.running = false;
    }
  };
}

// Copy from https://github.com/crimx/side-effect-manager/blob/main/src/gen-uid.ts
const SOUP =
  "!#%()*+,-./:;=?@[]^_`{|}~" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SOUP_LEN = SOUP.length;
const ID_LEN = 20;
const reusedIdCarrier = Array(ID_LEN);

export const genUID = (): string => {
  for (let i = 0; i < ID_LEN; i++) {
    reusedIdCarrier[i] = SOUP.charAt(Math.random() * SOUP_LEN);
  }
  return reusedIdCarrier.join("");
};

export function makeSlideParams(scenes: SceneDefinition[]) {
  const scenesWithoutPPT: SceneDefinition[] = [];
  let taskId = "";
  let url = "";

  // e.g. "ppt(x)://cdn/prefix/dynamicConvert/{taskId}/1.slide"
  const pptSrcRE = /^pptx?(?<prefix>:\/\/\S+?dynamicConvert)\/(?<taskId>\w+)\//;

  for (const { name, ppt } of scenes) {
    // make sure scenesWithoutPPT.length === scenes.length
    scenesWithoutPPT.push({ name });

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

  return { scenesWithoutPPT, taskId, url };
}

export const isBrowser = typeof window !== "undefined";
