import type { AppProps } from "./internal/App";

import { WhiteboardApp } from "./internal/App/instance";

export type Config = Omit<AppProps, "instance"> & {
  target: HTMLElement;
};

export function createWhiteboardApp(config: Config) {
  return new WhiteboardApp(config);
}
