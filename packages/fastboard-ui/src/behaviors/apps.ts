import type { FastboardApp } from "@netless/fastboard-core";
// import code_editor_svg from "./icons/visual-studio-code.svg";
// import geogebra_svg from "./icons/geogebra.svg";
// import countdown_svg from "./icons/countdown.svg";

export interface AppInToolbar {
  kind: string;
  icon: string;
  label: string;
  onClick: (app: FastboardApp) => void;
}

class AppsInToolbar {
  _listeners: Array<(data: AppInToolbar[]) => void> = [];
  constructor(private _data: AppInToolbar[]) {}
  get data() {
    return this._data;
  }
  get length() {
    return this._data.length;
  }
  subscribe(fn: (data: AppInToolbar[]) => void) {
    this._listeners.push(fn);
    fn(this._data);
    return () => {
      this._listeners = this._listeners.filter(item => item !== fn);
    };
  }
  push(...data: AppInToolbar[]) {
    this._data.push(...data);
    this._listeners.forEach(fn => fn(this._data));
  }
  insert(data: AppInToolbar, index: number) {
    this._data.splice(index, 0, data);
    this._listeners.forEach(fn => fn(this._data));
  }
  delete(filter: (data: AppInToolbar) => boolean) {
    this._data = this._data.filter(item => !filter(item));
    this._listeners.forEach(fn => fn(this._data));
  }
  clear() {
    this._data.length = 0;
    this._listeners.forEach(fn => fn(this._data));
  }
}

export type { AppsInToolbar };

export const stockedApps = new AppsInToolbar([]);
