import type { HotKey } from "@netless/fastboard-core";
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
