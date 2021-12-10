import "./style.scss";
import App from "./App.svelte";
import { room } from "./mock/room";

export function $(id: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return document.querySelector(id)!;
}

const app = new App({
  target: $("#app"),
});

Object.assign(window, {
  app,
  room,
});
