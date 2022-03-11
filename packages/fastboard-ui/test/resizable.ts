import type { SvelteAction } from "../src/typings";
import "./resizable.scss";

let id = 1;

function next_id() {
  return id++;
}

// 创建抓手（真的是抓手）
function create_handler() {
  const id = next_id();
  const el = document.createElement("div");
  el.classList.add("draggable");
  el.id = `resizable-${id}`;
  return el;
}

interface Size {
  width: number;
  height: number;
}

interface ResizableProps {
  defaultSize: Size;
  offsetX?: number;
  offsetY?: number;
}

export const resizable: SvelteAction<ResizableProps> = function (div, props) {
  const { defaultSize, offsetX = -25, offsetY = -25 } = props;
  const handler = create_handler();

  const offset = (() => {
    const { x, y } = div.getBoundingClientRect();
    return { x, y };
  })();

  let saved = { x: 0, y: 0, ...defaultSize };
  let size = { ...defaultSize };
  let active = false;

  const update_handler = () => {
    handler.style.left = `${offset.x + size.width + offsetX}px`;
    handler.style.top = `${offset.y + size.height + offsetY}px`;
  };

  const update_size = (value: Size) => {
    size = value;
    div.style.width = `${size.width}px`;
    div.style.height = `${size.height}px`;
    update_handler();
  };

  const update_active = (value: boolean) => {
    active = value;
    handler.classList.toggle("active", value);
  };

  const pointer_down = (ev: PointerEvent) => {
    if (ev.target === handler) {
      saved = { x: ev.x, y: ev.y, ...size };
      update_active(true);
    }
  };

  const pointer_move = (ev: PointerEvent) => {
    if (active) {
      const dx = ev.clientX - saved.x;
      const dy = ev.clientY - saved.y;
      update_size({
        width: Math.max(saved.width + dx, 10),
        height: Math.max(saved.height + dy, 10),
      });
    }
  };

  const pointer_up = () => {
    update_active(false);
  };

  window.addEventListener("pointerdown", pointer_down);
  window.addEventListener("pointermove", pointer_move);
  window.addEventListener("pointerup", pointer_up);

  document.body.append(handler);
  update_size(size);

  return {
    update({ defaultSize }) {
      Object.assign(saved, defaultSize);
      update_size(size);
    },
    destroy() {
      window.removeEventListener("pointerdown", pointer_down);
      window.removeEventListener("pointermove", pointer_move);
      window.removeEventListener("pointerup", pointer_up);
      handler.remove();
    },
  };
};
