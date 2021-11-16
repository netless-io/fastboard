import React from "react";
import ReactDOM from "react-dom";

export interface Config {
  el: HTMLElement;
}

function App() {
  return <div>Hello World</div>;
}

export function createApp(config: Config) {
  ReactDOM.render(<App />, config.el);
}
