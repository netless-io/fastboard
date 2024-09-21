/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastboardPlayer, Theme, Language } from "..";

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { resizable } from "@netless/fastboard-ui/test/resizable";
import { replayFastboard, ReplayFastboard } from "../src";
import "./style.scss";

function App() {
  const [log, setLog] = useState("preparing...");
  const [player, setPlayer] = useState<FastboardPlayer | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("en");
  const [, forceUpdate] = useState({});

  useEffect(() => {
    let player_instance: FastboardPlayer | undefined;

    replayFastboard({
      sdkConfig: {
        appIdentifier: import.meta.env.VITE_APPID || "123456789/123456789",
        region: "cn-hz",
      },
      replayRoom: {
        room: import.meta.env.VITE_ROOM_UUID || "b0c80aa0770011ef83863d0682a6c9bd",
        roomToken:
          import.meta.env.VITE_ROOM_TOKEN ||
          "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzI2ODg5NDMyMzc3Jm5vbmNlPWIwZWM4MjkwLTc3MDAtMTFlZi05NmE5LWFiMzg4NjE4OThhZiZyb2xlPTEmc2lnPTMzZGU0MDQ2ZDg5YzNkNDliOTFkMGQwZDYwOTY3MWIzYzU5NWQzN2IxNTFiZDhkM2Y2ZjYwYjFmODUwMWYxODQmdXVpZD1iMGM4MGFhMDc3MDAxMWVmODM4NjNkMDY4MmE2YzliZA",
        beginTimestamp: 1726884289991,
        duration: 36000,
        callbacks: {
          onPhaseChanged(phase) {
            setLog(log => `${log}\nphase: ${phase}`);
          },
        },
      },
      managerConfig: {
        cursor: true,
      },
      enableAppliancePlugin: true,
    }).then(player => {
      (window as any).player = player;
      (window as any).forceUpdate = forceUpdate;
      setPlayer((player_instance = player));
    });

    return () => {
      if (player_instance) {
        player_instance.destroy();
      }
    };
  }, []);

  const updateTheme = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(ev.currentTarget.value as Theme);
  }, []);

  const updateLang = useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(ev.currentTarget.value as Language);
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);

  return (
    <>
      <ReplayFastboard player={player} theme={theme} language={lang} />
      <div className="controller">
        <label>
          <small>Theme</small>
          <select name="theme" onInput={updateTheme}>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </label>
        <label>
          <small>Language</small>
          <select name="lang" onInput={updateLang}>
            <option value="en">English</option>
            <option value="zh-CN">简体中文</option>
          </select>
        </label>
      </div>
      <div className="log">{log}</div>
    </>
  );
}

const root = document.getElementById("app") as HTMLDivElement;
ReactDOM.createRoot(root).render(<App />);

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
