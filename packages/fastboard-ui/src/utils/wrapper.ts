import { h, render, type ComponentType } from "preact";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IComponentOptions<P extends Record<string, any> = Record<string, any>> {
  target: HTMLElement;
  props?: P;
}

export function wrap_preact_component<P>(component: ComponentType<P>, name: string) {
  const Component = class {
    target: HTMLElement;
    constructor({ target, props }: IComponentOptions<P>) {
      this.target = target;
      render(h(component, props ?? null), this.target);
    }
    update(props?: P) {
      render(h(component, props ?? null), this.target);
    }
    destroy() {
      render(null, this.target);
    }
  };
  Object.defineProperty(Component, "name", { value: name, configurable: true });
  return Component;
}
