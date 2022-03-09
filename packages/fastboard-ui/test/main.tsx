import { Tippy } from "../src";
import { h, Fragment, render } from "preact";
import { useState } from "preact/hooks";
import "tippy.js/dist/tippy.css";

function App() {
  const [s, ss] = useState(false);

  return (
    <>
      <input type="checkbox" checked={s} onInput={() => ss(s => !s)} />
      <Tippy content="world" interactive trigger="click">
        <button style={{ display: s ? "" : "none" }}>hello</button>
      </Tippy>
    </>
  );
}

render(<App />, document.querySelector("#app") as HTMLElement);
