import type { StatePair } from "../types";

import React from "react";

export function DarkControls({ dark, setDark }: StatePair<{ dark: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={dark}
          onChange={ev => setDark(ev.target.checked)}
        />
        Dark
      </label>
    </div>
  );
}
