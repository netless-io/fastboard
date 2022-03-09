import type { Instance, Props } from "tippy.js";
import type { ComponentChildren, Ref, RefObject, VNode } from "preact";
import { h, Fragment, cloneElement, Component } from "preact";
import { createPortal } from "preact/compat";
import tippy from "tippy.js";

const div_pool: HTMLDivElement[] = [];

function pull_div_from_pool() {
  const div = div_pool.pop();
  return div || document.createElement("div");
}

function push_div_to_pool(div: HTMLDivElement) {
  div.childNodes.forEach(child => child.remove.bind(child));
  if (div_pool.length < 100) div_pool.push(div);
}

function is_mutable_ref(ref: Ref<unknown>): ref is RefObject<unknown> {
  return Object.prototype.hasOwnProperty.call(ref, "current");
}

function preserve_ref(ref: Ref<unknown> | null | undefined, node: Element | null) {
  if (ref) {
    if (typeof ref === "function") {
      ref(node);
    } else if (is_mutable_ref(ref)) {
      ref.current = node;
    }
  }
}

export interface TippyProps extends Partial<Omit<Props, "content" | "render">> {
  content: ComponentChildren;
  children?: VNode<unknown>;
  disabled?: boolean;
}

export class Tippy extends Component<TippyProps> {
  container: HTMLDivElement;
  target: Element | null = null;
  instance: Instance | null = null;

  constructor(props: TippyProps) {
    super(props);
    this.container = pull_div_from_pool();
  }

  computedProps(): Partial<Props> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, children, disabled, ignoreAttributes = true, ...restProps } = this.props;
    return { ignoreAttributes, ...restProps, content: this.container };
  }

  override componentDidUpdate() {
    if (this.instance) {
      this.instance.setProps(this.computedProps());
      if (this.props.disabled) {
        this.instance.disable();
      } else {
        this.instance.enable();
      }
    }
  }

  override componentWillUnmount() {
    this.mount_or_unmount_tippy(null);
    push_div_to_pool(this.container);
  }

  child_ref = (node: Element | null) => {
    this.mount_or_unmount_tippy(node);
    preserve_ref(this.props.children?.ref, node);
  };

  mount_or_unmount_tippy(node: Element | null) {
    if (node) {
      if (!this.target) {
        this.target = node;
        this.instance = tippy(node, this.computedProps());
      }
    } else {
      if (this.instance) {
        this.instance.destroy();
        this.instance = null;
      }
    }
  }

  render() {
    const { children, content } = this.props;
    return h(Fragment, null, [
      children ? cloneElement(children, { ref: this.child_ref }) : null,
      createPortal(<>{content}</>, this.container),
    ]);
  }
}
