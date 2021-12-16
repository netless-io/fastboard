import type { StatePair } from "../types";

import React, { useCallback } from "react";
import { room } from "../mock";

export function RedoUndoControls({
  visible,
  setVisible,
}: StatePair<{ visible: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={useCallback(ev => setVisible(ev.target.checked), [])}
        />
        RedoUndo
      </label>
      <button onClick={room.commit.bind(room)}>
        commit (undoStep++, redoStep=0)
      </button>
    </div>
  );
}
