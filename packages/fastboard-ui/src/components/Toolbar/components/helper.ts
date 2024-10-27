import type { Color, HotKey } from "@netless/fastboard-core";
import { element, attr, append } from "svelte/internal";

/**
 * ```svelte
 * <span class="fastboard-toolbar-tooltip">
 *   <span>{text}</span>
 *   <span class="fastboard-toolbar-hotkey">{hotkey.toUpperCase()}</span>
 * </span>
 * ```
 */
export function tooltip(text: string, hotkey?: HotKey) {
  if (!hotkey || typeof hotkey !== "string") return text;
  const outer = element("span");
  const inner = element("span");
  inner.textContent = text;
  const hotkey_span = element("span");
  hotkey_span.textContent = hotkey.toUpperCase();
  attr(outer, "class", "fastboard-toolbar-tooltip");
  attr(hotkey_span, "class", "fastboard-toolbar-hotkey");
  append(outer, inner);
  append(outer, hotkey_span);
  return outer;
}


export function rgbToHex(r: number, g: number, b: number) {
  const hex = ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
  return "#" + hex;
}

export function hexToRgb(hex: string): Color {
  // 移除可能存在的 # 符号
  hex = hex.replace(/^#/, "");

  // 确保 hex 是 6 位
  if (hex.length !== 6) {
    throw new Error("Invalid hex color");
  }

  // 解析每两个字符为一个十进制数
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
}