import type { ConversionResponse, SceneDefinition } from "white-web-sdk";
import type {
  InsertDocsParams,
  InsertMediaParams,
  Language,
  Layout,
  WhiteboardAppConfig,
} from "./internal";
import { genUID, Instance, makeSlideParams } from "./internal";

export type {
  Language,
  Layout,
  WhiteboardAppConfig,
  InsertMediaParams,
  InsertDocsParams,
};

export class WhiteboardApp {
  private readonly _instance: Instance;

  public constructor(readonly config: WhiteboardAppConfig) {
    this._instance = new Instance(config);
  }

  public get room() {
    return this._instance.room;
  }

  public get manager() {
    return this._instance.manager;
  }

  public get sdk() {
    return this._instance.sdk;
  }

  public get i18n() {
    return this._instance.i18n;
  }

  public get target(): HTMLElement | null {
    return this._instance.target;
  }

  public get collector(): HTMLElement | null {
    return this._instance.collector;
  }

  public bindElement(target?: HTMLElement | null) {
    this._instance.bindElement(target || null);
  }

  public bindCollector(collector?: HTMLElement | null) {
    this._instance.bindCollector(collector || null);
  }

  public get layout() {
    return this._instance.config.layout;
  }

  public updateLayout(layout?: Layout | undefined) {
    this._instance.updateLayout(layout);
  }

  public insertMedia(params: InsertMediaParams) {
    this._instance.insertMedia(params);
  }

  /**
   * Insert PDF/PPTX from conversion result.
   * @param status https://developer.netless.link/server-en/home/server-conversion#get-query-task-conversion-progress
   */
  public insertDocs(
    filename: string,
    status: ConversionResponse
  ): Promise<string | undefined>;

  /**
   * Manual way.
   */
  public insertDocs(params: InsertDocsParams): Promise<string | undefined>;

  public insertDocs(
    arg1: string | InsertDocsParams,
    arg2?: ConversionResponse
  ) {
    if (typeof arg1 === "object" && "fileType" in arg1) {
      return this._instance.insertDocs(arg1);
    } else if (arg2 && arg2.status !== "Finished") {
      throw new Error("[WhiteboardApp] cannot insert a converting doc");
    } else if (arg2 && arg2.progress) {
      const scenes: SceneDefinition[] = arg2.progress.convertedFileList.map(
        (f, i) => ({
          name: String(i + 1),
          ppt: {
            src: f.conversionFileUrl,
            width: f.width,
            height: f.height,
            previewURL: f.preview,
          },
        })
      );
      const uid = genUID();
      const scenePath = `/${arg2.uuid}/${uid}`;
      const { scenesWithoutPPT, taskId, url } = makeSlideParams(scenes);
      if (taskId && url) {
        return this._instance.insertDocs({
          fileType: "pptx",
          scenePath,
          taskId,
          title: arg1,
          url,
          scenes: scenesWithoutPPT,
        });
      } else {
        return this._instance.insertDocs({
          fileType: "pdf",
          scenePath,
          scenes,
          title: arg1,
        });
      }
    }
  }

  public insertCodeEditor() {
    return this._instance.insertCodeEditor();
  }

  public insertGeoGebra() {
    return this._instance.insertGeoGebra();
  }

  public insertCountdown() {
    return this._instance.insertCountdown();
  }

  public changeLanguage(language: Language) {
    return this._instance.changeLanguage(language);
  }

  public dispose() {
    return this._instance.dispose();
  }
}
