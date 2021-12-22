import type { FastBoardConfig } from "../src";
import { useFastboard } from "../src";

import React from "react";
import ReactDOM from "react-dom";
import { Handler } from "../playground/controls/resize";
import "./index.scss";

const CanvasSize = { width: 720, height: 540 };

const WhiteboardAppConfig: FastBoardConfig = {
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID,
  },
  joinRoom: {
    uuid: import.meta.env.VITE_ROOM_UUID,
    roomToken: import.meta.env.VITE_ROOM_TOKEN,
    uid: "test",
  },
};

function App() {
  const [app, ref] = useFastboard(WhiteboardAppConfig);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).app = app;

  return (
    <>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
      <Handler
        target={document.getElementById("app") as HTMLDivElement}
        defaultSize={CanvasSize}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
