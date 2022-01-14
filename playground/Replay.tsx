import type { i18n } from "i18next";
import type { Player } from "white-web-sdk";
import type { Theme } from "../src/types";

import clsx from "clsx";
import { useState } from "preact/hooks";
import { PlayerControl } from "../src/components/PlayerControl";
import { player } from "./mock";
import { PlayerControlControls } from "./controls";

export function Replay({ dark, i18n }: { dark: boolean; i18n: i18n | null }) {
  const [player_control, set_player_control] = useState(true);

  const theme: Theme = dark ? "dark" : "light";
  const props = { theme, player: player as unknown as Player, i18n };

  return (
    <>
      <div className={clsx("wrapper", { dark })}>
        <div className="mark" style={{ opacity: 0.5 }}>
          replay
        </div>
        <div className="bottom">
          {player_control && <PlayerControl {...props} />}
        </div>
      </div>
      <div className="bottom-hang">
        <PlayerControlControls
          visible={player_control}
          setVisible={set_player_control}
        />
      </div>
    </>
  );
}
