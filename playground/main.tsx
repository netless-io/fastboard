import type { Theme } from "../src/types";

import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RedoUndo } from "../src";
import "./style.scss";

function App() {
  const [dark, set_dark] = useState(false);
  const [redo_undo, set_redo_undo] = useState(true);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const theme: Theme = dark ? "dark" : "light";

  return (
    <>
      <div className={clsx("wrapper", { dark })}>
        <div className="bottom-left">
          {redo_undo && <RedoUndo theme={theme} />}
        </div>
      </div>
      {/* - - - */}
      <div className="bottom-hang">
        <label>
          <input
            type="checkbox"
            checked={dark}
            onChange={ev => set_dark(ev.target.checked)}
          />
          Dark
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={redo_undo}
            onChange={useCallback(ev => set_redo_undo(ev.target.checked), [])}
          />
          RedoUndo
        </label>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
