import type { FastboardApp, FastboardPlayer } from "@netless/fastboard-core";
import type { FastboardProps, ReplayFastboardProps } from "../components/Fastboard";

import { Fastboard, ReplayFastboard } from "../components/Fastboard";

export interface UI {
  /** render UI to div */
  mount(div: Element, props?: Omit<FastboardProps, "app">): UI;
  /** update UI (theme, language, etc.) */
  update(props?: Omit<FastboardProps, "app">): void;
  /** remove UI */
  destroy(): void;
}

/**
 * @example
 * let ui = createUI(fastboardApp, document.getElementById("whiteboard"));
 * ui.update({ theme: "dark" })
 */
export function createUI(app: FastboardApp, div?: Element): UI {
  let fastboard: Fastboard | undefined;

  const ui: UI = {
    mount(div: Element, props?: Omit<FastboardProps, "app">) {
      if (fastboard) {
        fastboard.$destroy();
      }
      fastboard = new Fastboard({ target: div, props: { app, ...props } });
      return ui;
    },
    update(props?: Omit<FastboardProps, "app">) {
      if (fastboard) {
        fastboard.$set(props);
      }
    },
    destroy() {
      if (fastboard) {
        fastboard.$destroy();
      }
      fastboard = undefined;
    },
  };

  if (div) {
    ui.mount(div);
  }

  return ui;
}

export interface ReplayUI {
  /** render UI to div */
  mount(div: Element, props?: Omit<ReplayFastboardProps, "player">): ReplayUI;
  /** update UI (theme, language, etc.) */
  update(props?: Omit<ReplayFastboardProps, "player">): void;
  /** remove UI */
  destroy(): void;
}

/**
 * @example
 * let ui = createReplayUI(fastboardPlayer, document.getElementById("whiteboard"));
 * ui.update({ theme: "dark" })
 */
export function createReplayUI(player: FastboardPlayer, div?: Element): ReplayUI {
  let fastboard: ReplayFastboard | undefined;

  const ui: ReplayUI = {
    mount(div: Element, props?: Omit<ReplayFastboardProps, "player">) {
      if (fastboard) {
        fastboard.$destroy();
      }
      fastboard = new ReplayFastboard({ target: div, props: { player, ...props } });
      return ui;
    },
    update(props?: Omit<ReplayFastboardProps, "player">) {
      if (fastboard) {
        fastboard.$set(props);
      }
    },
    destroy() {
      if (fastboard) {
        fastboard.$destroy();
      }
      fastboard = undefined;
    },
  };

  if (div) {
    ui.mount(div);
  }

  return ui;
}
