import type { FastboardPlayer } from "@netless/fastboard-core";
import type { DivProps } from "./Fastboard";
import type { Theme } from "../typings";

import React, { forwardRef, useCallback } from "react";
import { PlayerControl } from "./PlayerControl";

export interface ReplayFastboardProps {
  player?: FastboardPlayer | null;
  theme?: Theme;
  autoHideControl?: boolean;
}

export const ReplayFastboard = /* @__PURE__ */ forwardRef<HTMLDivElement, ReplayFastboardProps & DivProps>(
  function ReplayFastboard({ player, theme = "light", autoHideControl = false, ...restProps }, ref) {
    const useWhiteboard = useCallback(
      (container: HTMLDivElement | null) => {
        if (container && player) player.bindContainer(container);
      },
      [player]
    );

    if (!player) {
      return <div className="fastboard-root" ref={ref} {...restProps} />;
    }

    return (
      <div className="fastboard-root" ref={ref} {...restProps}>
        <div className="fastboard-view" ref={useWhiteboard} />
        <div className="fastboard-bottom">
          <PlayerControl player={player} theme={theme} autoHide={autoHideControl} />
        </div>
      </div>
    );
  }
);
