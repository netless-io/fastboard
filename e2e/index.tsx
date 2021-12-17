import React, { useEffect } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { createWhiteboardApp } from "../src";
import "./index.css";

function App() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      createWhiteboardApp({
        target: ref.current,
        sdkConfig: {
          appIdentifier: import.meta.env.VITE_APPID as string,
        },
        joinRoom: {
          uuid: import.meta.env.VITE_ROOM_UUID as string,
          roomToken: import.meta.env.VITE_ROOM_TOKEN as string,
          uid: "test",
        },
      });
    }
  }, [ref]);
  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
}

ReactDOM.render(<App />, document.getElementById("app"));
