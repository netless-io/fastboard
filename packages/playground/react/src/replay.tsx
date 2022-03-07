import { useState } from "react";
import ReactDOM from "react-dom";
import { replayFastboard } from "@netless/fastboard";
import { ReplayFastboard } from "@netless/fastboard-react";
import { useAsyncValue } from "./hooks";
import { Handler } from "./controls/resize";
import "./main.scss";

function App() {
  const [log, setLog] = useState("preparing...");

  const player = useAsyncValue(() =>
    replayFastboard({
      sdkConfig: {
        appIdentifier: import.meta.env.VITE_APPID,
        region: "cn-hz",
      },
      replayRoom: {
        room: "b86bf2109dbb11ecbce43722439862b5",
        roomToken:
          "NETLESSROOM_YWs9c21nRzh3RzdLNk1kTkF5WCZub25jZT00NDViMDEzMC05ZGJjLTExZWMtYTYzZi02ZDIwNmVhNjI4YTgmcm9sZT0yJnNpZz0wMGQ2ZWNjNzkwYWJkM2JhMzVmMzhlNmYzMjk1NTZjOTY4MGNhYjY1N2I4ZjgxZWFkMTE3OWMxNDBlYTYyODE4JnV1aWQ9Yjg2YmYyMTA5ZGJiMTFlY2JjZTQzNzIyNDM5ODYyYjU",
        beginTimestamp: 1646619090394,
        duration: 70448,
        callbacks: {
          onPhaseChanged(phase) {
            setLog(log => `${log}\nphase: ${phase}`);
          },
        },
      },
      managerConfig: {
        cursor: true,
      },
    })
  );

  return (
    <>
      <ReplayFastboard player={player} />
      <pre className="right-hang">{log}</pre>
      <Handler
        target={document.querySelector("#app") as HTMLDivElement}
        defaultSize={{ width: 640, height: 480 }}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
