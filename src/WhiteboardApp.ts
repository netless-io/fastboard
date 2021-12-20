import type { SceneDefinition } from "white-web-sdk";
import type { WhiteboardAppConfig } from "./internal";
import { Instance } from "./internal";

export type InsertDocsParams =
  | {
      fileType: "pdf" | "ppt";
      params: {
        scenePath: string;
        scenes: SceneDefinition[];
        title?: string;
      };
    }
  | {
      fileType: "pptx";
      params: {
        scenePath: string;
        taskId: string;
        title?: string;
        url?: string;
      };
    };

export class WhiteboardApp {
  private readonly _instance: Instance;

  constructor(readonly config: WhiteboardAppConfig) {
    this._instance = new Instance(config);
  }

  public async insertDocs(params: InsertDocsParams) {
    return this._instance.insertDocs(params);
  }

  public dispose() {
    return this._instance.dispose();
  }
}
