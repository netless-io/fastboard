import type { ConvertedFile, SceneDefinition, Size } from "white-web-sdk";

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

    if (!ppt || !ppt.src.startsWith("ppt")) continue;

    const match = pptSrcRE.exec(ppt.src);
    if (!match || !match.groups) continue;

    taskId = match.groups.taskId;
    url = `https${match.groups.prefix}`;
    break;
  }

  return { scenes: emptyScenes, taskId, url };
}

export function convertedFileToScene(f: ConvertedFile, i: number): SceneDefinition {
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
