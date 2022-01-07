import type { WhiteboardApp, WhiteboardAppConfig } from "../src";

import { Fastboard } from "../src/react";
import { createWhiteboardApp } from "../src";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Handler } from "../playground/controls/resize";
import "./index.scss";

const CanvasSize = { width: 720, height: 540 };

const config: WhiteboardAppConfig = {
  sdkConfig: {
    appIdentifier: import.meta.env.VITE_APPID,
  },
  joinRoom: {
    uuid: import.meta.env.VITE_ROOM_UUID,
    roomToken: import.meta.env.VITE_ROOM_TOKEN,
    uid: "test",
  },
  managerConfig: {
    chessboard: true,
  },
};

function App() {
  const [app, setApp] = useState<WhiteboardApp | null>(null);

  useEffect(() => {
    // capture the app instance by ourself
    let app: WhiteboardApp | null = null;
    createWhiteboardApp(config).then(a => {
      setApp((app = a));
      Object.assign(window, { app });
    });
    return () => void app?.dispose();
    // make sure to only create app once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Fastboard app={app} />
      <Handler
        target={document.getElementById("app") as HTMLDivElement}
        defaultSize={CanvasSize}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
