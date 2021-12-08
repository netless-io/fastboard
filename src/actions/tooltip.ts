import type { Placement } from "tippy.js";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export type TooltipConfig = {
  content: string;
  placement: Placement;
};

export function tooltip(node: HTMLElement, config: TooltipConfig) {
  tippy(node, {
    content: config.content,
    placement: config.placement,
    offset: [0, 15],
  });
}
