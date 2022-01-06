import type {
  InsertDocsParams,
  Language,
  Layout,
  WhiteboardAppConfig,
} from "./internal";
import { Instance } from "./internal";

export type { Language, Layout, WhiteboardAppConfig, InsertDocsParams };

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

  public get target(): HTMLElement | null {
    return this._instance.target;
  }

  public get collector(): HTMLElement | null {
    return this._instance.collector;
  }

  public bindElement(
    target?: HTMLElement | null,
    collector?: HTMLElement | null
  ) {
    this._instance.bindElement(target || null, collector || null);
  }

  public get layout() {
    return this._instance.config.layout;
  }

  public updateLayout(layout?: Layout | undefined) {
    this._instance.updateLayout(layout);
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
