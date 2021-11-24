import type { WhiteboardAppConfig } from "./WhiteboardApp";

import { WhiteboardApp } from "./WhiteboardApp";

export function createWhiteboardApp(config: WhiteboardAppConfig): WhiteboardApp {
  return new WhiteboardApp(config);
}
