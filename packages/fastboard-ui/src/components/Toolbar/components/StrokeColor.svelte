<script lang="ts">
  import type { Color, FastboardApp } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import { colorKeys, colors } from "./constants";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let disabled = false;

  $: memberState = app?.memberState;
  $: strokeColor = $memberState?.strokeColor;

  function is_equal_color(a?: Color, b?: Color) {
    return a && b && a.every((v, i) => v === b[i]);
  }

  function set_stroke_color(ev: MouseEvent) {
    let button = ev.target as HTMLButtonElement | null;
    if (button && button.dataset.colorKey) {
      let color = colors[button.dataset.colorKey];
      if (color && app) {
        app.setStrokeColor(color);
      }
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fastboard-toolbar-colors {theme}" on:click={set_stroke_color}>
  {#each colorKeys as key (key)}
    <button
      class="fastboard-toolbar-btn fastboard-toolbar-color-btn {theme}"
      class:is-active={is_equal_color(strokeColor, colors[key])}
      data-color-key={key}
      {disabled}
    >
      <span class="fastboard-toolbar-color-item" style:background-color={key} />
    </button>
  {/each}
</div>
