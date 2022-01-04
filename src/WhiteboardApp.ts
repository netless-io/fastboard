import type {
  InsertDocsParams,
  Language,
  WhiteboardAppConfig,
} from "./internal";
import { Instance } from "./internal";

export type { WhiteboardAppConfig, InsertDocsParams };

export class WhiteboardApp {
  private readonly _instance: Instance;

  constructor(readonly config: WhiteboardAppConfig) {
    this._instance = new Instance(config);
  }

  public bindElement(target?: HTMLElement | null) {
    this._instance.target = target || null;
  }

  public insertDocs(params: InsertDocsParams) {
    return this._instance.insertDocs(params);
  }

  public changeLanguage(language: Language) {
    return this._instance.changeLanguage(language);
  }

  public dispose() {
    return this._instance.dispose();
  }
}
