import React from "react";
import { room } from "../mock";

export type StatePair<KV extends Record<string, unknown>> = KV extends Record<
  infer K,
  infer T
>
  ? K extends string
    ? Record<K, T> & Record<`set${Capitalize<K>}`, (v: T) => void>
    : never
  : never;

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
