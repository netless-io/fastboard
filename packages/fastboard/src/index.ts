import type { FastboardApp, FastboardPlayer } from "@netless/fastboard-core";
import type {
  FastboardProps,
  GenericIcon,
  Language,
  ReplayFastboardProps,
  Theme,
} from "@netless/fastboard-ui";

import { Fastboard, ReplayFastboard } from "@netless/fastboard-ui";

import "./style.scss";

export * from "@netless/fastboard-core";
export * from "@netless/fastboard-ui";
export type { Theme, Language, GenericIcon };

export type MountProps = Omit<FastboardProps, "app">;

/**
 * @deprecated Use `createUI` instead.
 */
export function mount(app: FastboardApp, div: HTMLDivElement, options?: MountProps) {
  const fastboard = new Fastboard({ target: div, props: { app, ...options } });

  return {
    update(props?: MountProps) {
      fastboard.$set(props);
    },
    destroy() {
      fastboard.$destroy();
    },
  };
}

export type ReplayProps = Omit<ReplayFastboardProps, "player">;

/**
 * @deprecated Use `createReplayUI` instead.
 */
export function replay(player: FastboardPlayer, div: HTMLDivElement, options?: ReplayProps) {
  const replayFastboard = new ReplayFastboard({ target: div, props: { player, ...options } });

  return {
    update(props?: ReplayProps) {
      replayFastboard.$set(props);
    },
    destroy() {
      replayFastboard.$destroy();
    },
  };
}
