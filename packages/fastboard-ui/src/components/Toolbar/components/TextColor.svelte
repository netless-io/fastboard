<script lang="ts">
  import type { Color, FastboardApp } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import { default_colors } from "./constants";
  import { hexToRgb, rgbToHex } from "./helper";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let disabled = false;
  export let colors: Color[] = default_colors;

  $: memberState = app?.memberState;
  $: textColor = $memberState?.textColor;

  function is_equal_color(a?: Color, b?: Color) {
    return a && b && a.every((v, i) => v === b[i]);
  }

  function set_stroke_color(ev: MouseEvent) {
    let button = ev.target as HTMLButtonElement | null;
    if (button && button.dataset.colorKey) {
      let color = button.dataset.colorKey;
      if (color && app) {
        app.setTextColor(hexToRgb(color));
      }
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fastboard-toolbar-colors {theme}" on:click={set_stroke_color}>
  {#each colors as color}
    <button
      class="fastboard-toolbar-btn fastboard-toolbar-color-btn {theme}"
      class:is-active={is_equal_color(textColor, color)}
      data-color-key={rgbToHex(color[0], color[1], color[2])}
      {disabled}
    >
      <span
        class="fastboard-toolbar-color-item"
        style:background-color={rgbToHex(color[0], color[1], color[2])}
      />
    </button>
  {/each}
</div>
