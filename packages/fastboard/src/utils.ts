import type { SceneDefinition } from "white-web-sdk";

export function noop() {
  /* noop */
}

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
