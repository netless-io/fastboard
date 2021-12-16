import type { Room } from "white-web-sdk";
import type { Theme } from "../src/types";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { room } from "./mock";
import "./style.scss";

import { RedoUndo } from "../src";
import { DarkControls } from "./controls/DarkControls";
import { RedoUndoControls } from "./controls/RedoUndoControls";

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
          {redo_undo && (
            <RedoUndo theme={theme} room={room as unknown as Room} />
          )}
        </div>
      </div>
      {/* - - - */}
      <div className="bottom-hang">
        <DarkControls dark={dark} setDark={set_dark} />
        <RedoUndoControls visible={redo_undo} setVisible={set_redo_undo} />
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
