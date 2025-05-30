import type { Color, FastboardApp, FastboardPlayer } from "@netless/fastboard-core";
import type { FastboardProps, ReplayFastboardProps } from "../components/Fastboard";

import { Fastboard, ReplayFastboard } from "../components/Fastboard";

export interface UI {
  /** render UI to div */
  mount(div: Element, props?: FastboardProps): UI;
  /** update UI (theme, language, etc.) */
  update(props?: FastboardProps): void;
  /** remove UI */
  destroy(): void;
  /** force show toolbar */
  forceShowToolbar(): void;
  /** force hide toolbar */
  forceHideToolbar(): void;
  /** recover show toolbar */
  recoverToolbar(): void;
  /** force show redo undo */
  forceShowRedoUndo(): void;
  /** force hide redo undo */
  forceHideRedoUndo(): void;
  /** recover show redo undo */
  recoverRedoUndo(): void;
  /** force show zoom control */
  forceShowZoomControl(): void;
  /** force hide zoom control */
  forceHideZoomControl(): void;
  /** recover show zoom control */
  recoverZoomControl(): void;
  /** force show page control */
  forceShowPageControl(): void;
  /** force hide page control */
  forceHidePageControl(): void;
  /** recover show page control */
  recoverPageControl(): void;
}

/**
 * @example
 * let ui = createUI(fastboardApp, document.getElementById("whiteboard"));
 * ui.update({ theme: "dark" })
 */
export function createUI(app?: FastboardApp | null, div?: Element): UI {
  let fastboard: Fastboard | undefined;
  let colors: Color[] | undefined;

  if (app?.manager && app.manager.room) {
    const floatBarOptions = (app.manager.room as any).floatBarOptions as { colors?: Color[] };
    if (floatBarOptions?.colors) {
      colors = floatBarOptions.colors as Color[];
    }
  }
  const ui: UI = {
    mount(div: Element, props?: FastboardProps) {
      if (fastboard) {
        fastboard.$destroy();
      }
      if (colors && props?.config && !props.config.toolbar?.colors) {
        if (!props?.config.toolbar) {
          props.config.toolbar = {};
        }
        props.config.toolbar.colors = colors;
      }
      fastboard = new Fastboard({ target: div, props: { app, ...props } });
      return ui;
    },
    update(props?: FastboardProps) {
      if (fastboard && props) {
        if (colors && props?.config && !props.config.toolbar?.colors) {
          if (!props?.config.toolbar) {
            props.config.toolbar = {};
          }
          props.config.toolbar.colors = colors;
        }
        fastboard.$set(props);
      }
    },
    destroy() {
      if (fastboard) {
        fastboard.$destroy();
      }
      fastboard = undefined;
    },
    forceShowToolbar() {
      if (fastboard) {
        fastboard.$set({ force_show_toolbar: true });
      }
    },
    forceHideToolbar() {
      if (fastboard) {
        fastboard.$set({ force_show_toolbar: false });
      }
    },
    recoverToolbar() {
      if (fastboard) {
        fastboard.$set({ force_show_toolbar: undefined });
      }
    },
    forceShowPageControl() {
      if (fastboard) {
        fastboard.$set({ force_show_page_control: true });
      }
    },
    forceHidePageControl() {
      if (fastboard) {
        fastboard.$set({ force_show_page_control: false });
      }
    },
    recoverPageControl() {
      if (fastboard) {
        fastboard.$set({ force_show_page_control: undefined });
      }
    },
    forceShowRedoUndo() {
      if (fastboard) {
        fastboard.$set({ force_show_redo_undo: true });
      }
    },
    forceHideRedoUndo() {
      if (fastboard) {
        fastboard.$set({ force_show_redo_undo: false });
      }
    },
    recoverRedoUndo() {
      if (fastboard) {
        fastboard.$set({ force_show_redo_undo: undefined });
      }
    },
    forceShowZoomControl() {
      if (fastboard) {
        fastboard.$set({ force_show_zoom_control: true });
      }
    },
    forceHideZoomControl() {
      if (fastboard) {
        fastboard.$set({ force_show_zoom_control: false });
      }
    },
    recoverZoomControl() {
      if (fastboard) {
        fastboard.$set({ force_show_zoom_control: undefined });
      }
    },
  };

  if (div) {
    ui.mount(div, { app });
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
}

/**
 * @example
 * let ui = createReplayUI(fastboardPlayer, document.getElementById("whiteboard"));
 * ui.update({ theme: "dark" })
 */
export function createReplayUI(player?: FastboardPlayer | null, div?: Element): ReplayUI {
  let fastboard: ReplayFastboard | undefined;

  const ui: ReplayUI = {
    mount(div: Element, props?: ReplayFastboardProps) {
      if (fastboard) {
        fastboard.$destroy();
      }
      fastboard = new ReplayFastboard({ target: div, props: { player, ...props } });
      return ui;
    },
    update(props?: ReplayFastboardProps) {
      if (fastboard && props) {
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
    ui.mount(div, { player });
  }

  return ui;
}
