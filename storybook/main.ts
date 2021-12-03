/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Storybook from "./Storybook.svelte";

Object.assign(window, {
  app: new Storybook({
    target: document.querySelector("#app")!,
  }),
});
