import type { ConvertedFile, JoinRoomParams, SceneDefinition, Size } from "white-web-sdk";
import { WindowManager } from "@netless/window-manager";

export function noop() {
  /* noop */
}

export function getImageSize(url: string, fallback: Size) {
  return new Promise<Size>(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(fallback);
    img.src = url;
  });
}

export function makeSlideParams(scenes: SceneDefinition[]) {
  const emptyScenes: SceneDefinition[] = [];
  let taskId = "";
  let url = "";

  // e.g. "ppt(x)://cdn/prefix/dynamicConvert/{taskId}/1.slide"
  const pptSrcRE = /^pptx?(?<prefix>:\/\/\S+?dynamicConvert)\/(?<taskId>\w+)\//;

  for (const { name, ppt } of scenes) {
    // make sure scenesWithoutPPT.length === scenes.length
    emptyScenes.push({ name });

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

  return { emptyScenes, taskId, url };
}

export function convertedFileToScene(f: ConvertedFile, i: number) {
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

export function ensureWindowManager(joinRoom: JoinRoomParams) {
  if (!joinRoom.invisiblePlugins || !joinRoom.invisiblePlugins.includes(WindowManager)) {
    joinRoom.invisiblePlugins = [...(joinRoom.invisiblePlugins || []), WindowManager];
  }
  return joinRoom;
}

// Copy from https://github.com/crimx/side-effect-manager/blob/main/src/gen-uid.ts
const SOUP = "!#%()*+,-./:;=?@[]^_`{|}~" + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SOUP_LEN = SOUP.length;
const ID_LEN = 20;
const reusedIdCarrier = /* @__PURE__ */ Array(ID_LEN);

export function genUID() {
  for (let i = 0; i < ID_LEN; i++) {
    reusedIdCarrier[i] = SOUP.charAt(Math.random() * SOUP_LEN);
  }
  return reusedIdCarrier.join("");
}
