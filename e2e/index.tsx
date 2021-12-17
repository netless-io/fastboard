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
          appIdentifier: "test/123",
        },
        joinRoom: {
          uuid: "7be362105f0411ec827323babb4b42fb",
          roomToken:
            "NETLESSROOM_YWs9c21nRzh3RzdLNk1kTkF5WCZub25jZT03YzIzMmEzMC01ZjA0LTExZWMtYTIxMy05ZGFhNjI4ZGRjYjkmcm9sZT0xJnNpZz1hZjhmYzYzMmFlZDFkMzFkNThlZGQ2ZTRiMmNiYjliZjdkNzk3NWFlN2Q0NzdlMTU3Zjk5ZDM3ZTlmMTBjYmQ4JnV1aWQ9N2JlMzYyMTA1ZjA0MTFlYzgyNzMyM2JhYmI0YjQyZmI",
          uid: "test",
        },
      });
    }
  }, [ref]);
  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
}

ReactDOM.render(<App />, document.getElementById("app"));
