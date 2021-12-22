import type { WhiteboardApp } from "../src";

import React, { useCallback, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Handler } from "../playground/controls/resize";
import { createWhiteboardApp } from "../src";
import "./index.scss";

const CanvasSize = { width: 720, height: 540 };

function App() {
  const app = useRef<WhiteboardApp | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const useApp = useCallback((div: HTMLDivElement | null) => {
    if (div) {
      setRef(div);
      app.current = createWhiteboardApp({
        target: div,
        sdkConfig: {
          appIdentifier: import.meta.env.VITE_APPID,
        },
        joinRoom: {
          uuid: import.meta.env.VITE_ROOM_UUID,
          roomToken: import.meta.env.VITE_ROOM_TOKEN,
          uid: "test",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).app = app.current;
    } else {
      setRef(null);
      if (app.current) {
        app.current.dispose();
        app.current = null;
      }
    }
  }, []);

  return (
    <>
      <div ref={useApp} style={{ width: "100%", height: "100%" }} />
      {ref && (
        <Handler
          target={ref.parentElement as HTMLDivElement}
          defaultSize={CanvasSize}
        />
      )}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
