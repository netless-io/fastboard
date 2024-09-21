/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Theme, Language, FastboardUIConfig } from "..";

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { resizable } from "@netless/fastboard-ui/test/resizable";
import { useFastboard, genUID, Fastboard, apps } from "../src";
import "./style.scss";

const search = new URLSearchParams(location.search);

const FastboardLayout: FastboardUIConfig = {
  page_control: { enable: false },
  redo_undo: { enable: true },
  toolbar: {
    enable: true,
    placement: "right",
    items: ["pencil", "eraser", "hand", "laserPointer"],
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
      uuid: import.meta.env.VITE_ROOM_UUID || "b0c80aa0770011ef83863d0682a6c9bd",
      roomToken: import.meta.env.VITE_ROOM_TOKEN || "NETLESSROOM_YWs9VWtNUk92M1JIN2I2Z284dCZleHBpcmVBdD0xNzI2ODg5NDMyMzc3Jm5vbmNlPWIwZWM4MjkwLTc3MDAtMTFlZi05NmE5LWFiMzg4NjE4OThhZiZyb2xlPTEmc2lnPTMzZGU0MDQ2ZDg5YzNkNDliOTFkMGQwZDYwOTY3MWIzYzU5NWQzN2IxNTFiZDhkM2Y2ZjYwYjFmODUwMWYxODQmdXVpZD1iMGM4MGFhMDc3MDAxMWVmODM4NjNkMDY4MmE2YzliZA",
      isWritable: search.get("isWritable") !== "0",
    },
    managerConfig: {
      cursor: true,
    },
    enableAppliancePlugin: true,
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
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

resizable(root, {
  defaultSize: { width: 400, height: 300 },
  offsetX: -30,
  offsetY: -30,
});
