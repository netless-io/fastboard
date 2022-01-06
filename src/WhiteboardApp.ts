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

  get room() {
    return this._instance.room;
  }

  get manager() {
    return this._instance.manager;
  }

  get sdk() {
    return this._instance.sdk;
  }

  get i18n() {
    return this._instance.i18n;
  }

  private _target: HTMLElement | null = null;
  public get target(): HTMLElement | null {
    return this._target;
  }

  private _collector: HTMLElement | null = null;
  public get collector(): HTMLElement | null {
    return this._collector;
  }

  public bindElement(
    target?: HTMLElement | null,
    collector?: HTMLElement | null
  ) {
    this._target = target || null;
    this._collector = collector || null;
    this._instance.bindElement(this._target, this._collector);
  }

  public insertDocs(params: InsertDocsParams) {
    return this._instance.insertDocs(params);
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
