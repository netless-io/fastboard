import { applyStyles } from "../helpers";
import style from "../style.scss?inline";

const newEl = applyStyles(style);

if (import.meta.hot) {
  import.meta.hot.dispose(data => {
    data.el = newEl;
  });
  import.meta.hot.accept(() => {
    const oldEl = import.meta.hot?.data.el;
    if (oldEl) {
      oldEl.innerText = newEl.innerText;
      newEl.remove();
    }
  });
}
