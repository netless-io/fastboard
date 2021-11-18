import type { MountWhiteboardParams } from "./internal";

import { WhiteboardApp } from "./internal/App/instance";

export type Config = MountWhiteboardParams & {
  target: HTMLElement;
};

export function createWhiteboardApp(config: Config) {
  return new WhiteboardApp(config);
}
