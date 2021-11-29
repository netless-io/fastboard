import type { WhiteboardAppConfig } from "./internal";

import { WhiteboardApp } from "./WhiteboardApp";

export { WhiteboardApp };

export function createWhiteboardApp(config: WhiteboardAppConfig): WhiteboardApp {
  return new WhiteboardApp(config);
}
