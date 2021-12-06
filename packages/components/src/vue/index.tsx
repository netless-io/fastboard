import type { App } from "vue";
import {
  defineComponent,
  h, // eslint-disable-line
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";
import SvelteRedoUndo from "../components/RedoUndo.svelte";
import version from "../version";

export { version };

export const RedoUndo = defineComponent({
  name: "NetlessRedoUndo",
  props: {
    room: Object,
    manager: Object,
  },
  setup(props) {
    const wrapper = ref<HTMLDivElement | null>(null);
    let instance: SvelteRedoUndo | undefined;
    onMounted(() => {
      if (wrapper.value) {
        instance = new SvelteRedoUndo({ target: wrapper.value });
      }
    });
    onUpdated(() => {
      instance && instance.$set(props);
    });
    onUnmounted(() => {
      if (instance) {
        instance.$destroy();
        instance = undefined;
      }
    });
    return () => <div ref={wrapper} />;
  },
});

type ComponentType = any; // eslint-disable-line

interface CreateOptions {
  prefix?: string;
  components?: ComponentType[];
}

export function create({ prefix = "Netless", components = [] }: CreateOptions) {
  const installed = new Set<App>();
  const register = (app: App, name: string, component: ComponentType) => {
    const registered = app.component(prefix + name);
    if (!registered) {
      app.component(prefix + name, component);
    }
  };
  const install = (app: App) => {
    if (installed.has(app)) return;
    installed.add(app);
    for (const component of components) {
      const { name, alias } = component;
      register(app, name, component);
      if (alias) {
        for (const aliasName of alias) {
          register(app, aliasName, component);
        }
      }
    }
  };
  return { version, prefix, install };
}
