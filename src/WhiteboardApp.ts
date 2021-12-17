import type { WhiteboardAppConfig } from "./internal";
import { Instance } from "./internal";

export class WhiteboardApp {
  private readonly _instance: Instance;

  constructor(readonly config: WhiteboardAppConfig) {
    this._instance = new Instance(config);
  }

  dispose() {
    return this._instance.dispose();
  }
}
