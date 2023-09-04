import type { ConvertedFile, SceneDefinition, Size } from "white-web-sdk";

export function getImageSize(url: string, fallback: Size, crossOrigin?: boolean | string) {
  return new Promise<Size>(resolve => {
    const img = new Image();
    applyCrossOrigin(img, url, crossOrigin);
    img.onload = () => resolve(img);
    img.onerror = () => resolve(fallback);
    img.src = url;
  });
}

// https://github.com/pixijs/pixijs/blob/dev/packages/core/src/textures/resources/BaseImageResource.ts#L51
function applyCrossOrigin(image: HTMLImageElement, src: string, crossOrigin?: boolean | string): void {
  if (crossOrigin === undefined && !src.startsWith("data:")) {
    image.crossOrigin = determineCrossOrigin(src);
  } else if (crossOrigin !== false) {
    image.crossOrigin = typeof crossOrigin === "string" ? crossOrigin : "anonymous";
  }
}

function determineCrossOrigin(src: string): string {
  if (src.startsWith("data:") || typeof window === "undefined" || !window.location) {
    return "";
  }
  const loc = window.location;
  try {
    const parsedUrl = new URL(src, document.baseURI);
    if (
      parsedUrl.hostname !== loc.hostname ||
      parsedUrl.port !== loc.port ||
      parsedUrl.protocol !== loc.protocol
    ) {
      return "anonymous";
    }
    return "";
  } catch {
    return "";
  }
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
