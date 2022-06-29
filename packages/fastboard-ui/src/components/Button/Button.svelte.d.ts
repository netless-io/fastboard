import { SvelteComponentTyped } from "svelte";
import type { Content, Placement } from "tippy.js";
import type { Theme } from "../../typings";

export declare interface ButtonProps {
  class?: string;
  name?: string;
  theme?: Theme;
  active?: boolean;
  disabled?: boolean;
  content?: Content;
  placement?: Placement;
  menu?: Content;
  menu_placement?: Placement;
}

export declare interface ButtonEvents {
  click: WindowEventMap["click"];
}

export declare interface ButtonSlots {
  default: any;
}

declare class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {}
export default Button;
