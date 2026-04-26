/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Theme, Language, FastboardUIConfig } from "@netless/fastboard-react-full";

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { resizable } from "@netless/fastboard-ui/test/resizable";
import { useFastboard, genUID, Fastboard, apps } from "@netless/fastboard-react-full";
import "./style.scss";

import fullWorkerString from "@netless/appliance-plugin/dist/fullWorker.js?raw";
import subWorkerString from "@netless/appliance-plugin/dist/subWorker.js?raw";
const fullWorkerBlob = new Blob([fullWorkerString], { type: "text/javascript" });
const fullWorkerUrl = URL.createObjectURL(fullWorkerBlob);
const subWorkerBlob = new Blob([subWorkerString], { type: "text/javascript" });
const subWorkerUrl = URL.createObjectURL(subWorkerBlob);

const search = new URLSearchParams(location.search);

const FastboardLayout: FastboardUIConfig = {
  page_control: { enable: false },
  redo_undo: { enable: true },
  toolbar: {
    enable: true,
    placement: "right",
    items: ["pencil", "eraser", "hand", "laserPointer"],
    colors: [
      [50, 197, 255],
      [0, 145, 255],
    ],
  },
  zoom_control: { enable: true },
};

function App() {
  const app = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: import.meta.env.VITE_APPID || "123456789/123456789",
      region: "cn-hz",
    },
    joinRoom: {
      uid: genUID(),
      uuid: import.meta.env.VITE_ROOM_UUID || "3a2078e02e3f11f18358234540639caf",
      roomToken:
        import.meta.env.VITE_ROOM_TOKEN ||
        "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzc1MTg0ODUyMDU4Jm5vbmNlPTNhNDQ3YmEwLTJlM2YtMTFmMS1iYzM4LWQ3Yjg5YzgwZTNlMSZyb2xlPTEmc2lnPTcxNTc3MDNlODM1MWRhOTE3NDM5YzM4YTgwZDMwNmVjY2UxZGYwMzExNjFmN2I3NTllZTVkYzFjMGQyNTY0ZjImdXVpZD0zYTIwNzhlMDJlM2YxMWYxODM1ODIzNDU0MDYzOWNhZg",
      isWritable: search.get("isWritable") !== "0",
      floatBar: true,
    },
    managerConfig: {
      cursor: true,
    },
    enableAppliancePlugin: {
      cdn: {
        fullWorkerUrl,
        subWorkerUrl,
      },
    },
  }));

  (window as any).app = app;

  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("en");

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
      <Fastboard app={app} theme={theme} language={lang} config={FastboardLayout} />
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
      <div className="links">
        <a href="/replay.html">Replay</a>
      </div>
    </>
  );
}

apps.push(
  {
    icon: "https://api.iconify.design/logos:youtube-icon.svg?color=currentColor",
    kind: "Plyr",
    label: "YouTube",
    onClick(app) {
      app.manager.addApp({
        kind: "Plyr",
        options: { title: "YouTube" },
        attributes: {
          src: "https://www.youtube.com/embed/bTqVqk7FSmY",
          provider: "youtube",
        },
      });
    },
  },
  {
    icon: "https://api.iconify.design/logos:google-icon.svg?color=currentColor",
    kind: "EmbeddedPage",
    label: "Google Docs",
    onClick(app) {
      app.manager.addApp({
        kind: "EmbeddedPage",
        options: { title: "Google Docs" },
        attributes: {
          src: "https://docs.google.com/document/d/1bd4SRb5BmTUjPGrFxU2V7KI2g_mQ-HQUBxKTxsEn5e4/edit?usp=sharing",
        },
      });
    },
  },
  {
    icon: "https://api.iconify.design/ic:baseline-slideshow.svg?color=currentColor",
    kind: "Slide",
    label: "Slide",
    onClick(app) {
      const taskId = "9abed6605bbc11ec88a83b917638a00c";
      app.insertDocs({
        fileType: "pptx",
        scenePath: `/Slide/${taskId}`,
        taskId,
        title: "星空",
      });
    },
  }
);

const root = document.getElementById("app") as HTMLDivElement;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
