import type { Room } from "white-web-sdk";
import type { Theme } from "../src/types";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { room } from "./mock";
import "./style.scss";

import { RedoUndo } from "../src";
import { PageControl } from "../src/components/PageControl";
import { ZoomControl } from "../src/components/ZoomControl";
import {
  DarkControls,
  PageControlControls,
  RedoUndoControls,
  WritableControls,
  ZoomControlControls,
} from "./controls";

function App() {
  const [writable, set_writable] = useState(true);
  const [dark, set_dark] = useState(false);
  const [redo_undo, set_redo_undo] = useState(true);
  const [page_control, set_page_control] = useState(true);
  const [zoom_control, set_zoom_control] = useState(true);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    room.setWritable(writable);
  }, [writable]);

  const theme: Theme = dark ? "dark" : "light";

  return (
    <>
      <div className={clsx("wrapper", { dark })}>
        <div className="bottom-left">
          {redo_undo && (
            <RedoUndo theme={theme} room={room as unknown as Room} />
          )}
          {zoom_control && (
            <ZoomControl theme={theme} room={room as unknown as Room} />
          )}
        </div>
        <div className="bottom-right">
          {page_control && (
            <PageControl theme={theme} room={room as unknown as Room} />
          )}
        </div>
      </div>
      <div className="bottom-hang">
        <WritableControls writable={writable} setWritable={set_writable} />
        <DarkControls dark={dark} setDark={set_dark} />
        <RedoUndoControls visible={redo_undo} setVisible={set_redo_undo} />
        <PageControlControls
          visible={page_control}
          setVisible={set_page_control}
        />
        <ZoomControlControls
          visible={zoom_control}
          setVisible={set_zoom_control}
        />
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
