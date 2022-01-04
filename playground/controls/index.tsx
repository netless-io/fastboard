import type { ChangeEvent } from "react";

import React, { useEffect } from "react";
import { PlayerPhase } from "white-web-sdk";
import { player, room } from "../mock";

export type StatePair<KV extends Record<string, unknown>> = KV extends Record<
  infer K,
  infer T
>
  ? K extends string
    ? Record<K, T> & Record<`set${Capitalize<K>}`, (v: T) => void>
    : never
  : never;

export function ModeControls({
  mode,
  setMode,
}: StatePair<{ mode: "online" | "replay" }>) {
  const update = (ev: ChangeEvent<HTMLInputElement>) => {
    setMode(ev.target.value as "online" | "replay");
  };

  return (
    <div className="row">
      <label>
        <input
          type="radio"
          name="mode"
          value="online"
          checked={mode === "online"}
          onChange={update}
        />
        <span>Online</span>
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="replay"
          checked={mode === "replay"}
          onChange={update}
        />
        <span>Replay</span>
      </label>
    </div>
  );
}

export function LanguageControls({
  language,
  setLanguage,
}: StatePair<{ language: "zh-CN" | "en" }>) {
  const update = (ev: ChangeEvent<HTMLInputElement>) => {
    setLanguage(ev.target.value as "zh-CN" | "en");
  };

  return (
    <div className="row">
      <label>
        <input
          type="radio"
          name="language"
          value="en"
          checked={language === "en"}
          onChange={update}
        />
        <span>English</span>
      </label>
      <label>
        <input
          type="radio"
          name="language"
          value="zh-CN"
          checked={language === "zh-CN"}
          onChange={update}
        />
        <span>中文</span>
      </label>
    </div>
  );
}

export function WritableControls({
  writable,
  setWritable,
}: StatePair<{ writable: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={writable}
          onChange={ev => setWritable(ev.target.checked)}
        />
        Writable
      </label>
    </div>
  );
}

export function DarkControls({ dark, setDark }: StatePair<{ dark: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={dark}
          onChange={ev => setDark(ev.target.checked)}
        />
        Dark
      </label>
    </div>
  );
}

export function RedoUndoControls({
  visible,
  setVisible,
}: StatePair<{ visible: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={ev => setVisible(ev.target.checked)}
        />
        RedoUndo
      </label>
      <button onClick={room.commit.bind(room)}>
        commit (undoStep++, redoStep=0)
      </button>
    </div>
  );
}

export function PageControlControls({
  visible,
  setVisible,
}: StatePair<{ visible: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={ev => setVisible(ev.target.checked)}
        />
        PageControl
      </label>
    </div>
  );
}

export function ZoomControlControls({
  visible,
  setVisible,
}: StatePair<{ visible: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={ev => setVisible(ev.target.checked)}
        />
        ZoomControl
      </label>
    </div>
  );
}

export function ToolbarControls({
  visible,
  setVisible,
}: StatePair<{ visible: boolean }>) {
  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={ev => setVisible(ev.target.checked)}
        />
        Toolbar
      </label>
    </div>
  );
}

export function PlayerControlControls({
  visible,
  setVisible,
}: StatePair<{ visible: boolean }>) {
  useEffect(() => {
    player.setPhase(PlayerPhase.Buffering);
    const timer = setTimeout(() => {
      player.pause();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="row">
      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={ev => setVisible(ev.target.checked)}
        />
        PlayerControl
      </label>
      <button onClick={player.setPhase.bind(player, PlayerPhase.Buffering)}>
        buffering
      </button>
      <button onClick={player.pause.bind(player)}>pause</button>
    </div>
  );
}
