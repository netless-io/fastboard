import type { FastboardApp, FastboardPlayer } from "@netless/fastboard-core";
import type { FastboardProps, ReplayFastboardProps } from "../components/Fastboard";

import { Fastboard, ReplayFastboard } from "../components/Fastboard";

export interface UI {
  /** render UI to div */
  mount(div: Element, props?: FastboardProps): UI;
  /** update UI (theme, language, etc.) */
  update(props?: FastboardProps): void;
  /** remove UI */
  destroy(): void;
  /** div == null ? destroy() : mount() */
  setElement(div: Element | null): void;
}

/**
 * @example
 * let ui = createUI(fastboardApp, document.getElementById("whiteboard"));
 * ui.update({ theme: "dark" })
 */
export function createUI(app?: FastboardApp | null, div?: Element): UI {
  let fastboard: Fastboard | undefined;

  function mount(div: Element, props?: FastboardProps) {
    if (fastboard) {
      fastboard.$destroy();
    }
    fastboard = new Fastboard({ target: div, props: { app, ...props } });
    return ui;
  }

  function update(props?: FastboardProps) {
    if (fastboard) {
      fastboard.$set(props);
    }
  }

  function destroy() {
    if (fastboard) {
      fastboard.$destroy();
    }
    fastboard = undefined;
  }

  function setElement(div: Element | null) {
    if (div) {
      mount(div);
    } else {
      destroy();
    }
  }

  const ui: UI = { mount, update, destroy, setElement };

  if (div) {
    mount(div, { app });
  }

  return ui;
}

export interface ReplayUI {
  /** render UI to div */
  mount(div: Element, props?: ReplayFastboardProps): ReplayUI;
  /** update UI (theme, language, etc.) */
  update(props?: ReplayFastboardProps): void;
  /** remove UI */
  destroy(): void;
  /** div == null ? destroy() : mount() */
  setElement(div: Element | null): void;
}

/**
 * @example
 * let ui = createReplayUI(fastboardPlayer, document.getElementById("whiteboard"));
 * ui.update({ theme: "dark" })
 */
export function createReplayUI(player?: FastboardPlayer | null, div?: Element): ReplayUI {
  let fastboard: ReplayFastboard | undefined;

  function mount(div: Element, props?: ReplayFastboardProps) {
    if (fastboard) {
      fastboard.$destroy();
    }
    fastboard = new ReplayFastboard({ target: div, props: { player, ...props } });
    return ui;
  }

  function update(props?: ReplayFastboardProps) {
    if (fastboard) {
      fastboard.$set(props);
    }
  }

  function destroy() {
    if (fastboard) {
      fastboard.$destroy();
    }
    fastboard = undefined;
  }

  function setElement(div: Element | null) {
    if (div) {
      mount(div);
    } else {
      destroy();
    }
  }

  const ui: ReplayUI = { mount, update, destroy, setElement };

  if (div) {
    mount(div, { player });
  }

  return ui;
}
