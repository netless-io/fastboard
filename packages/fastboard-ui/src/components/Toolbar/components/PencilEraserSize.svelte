<script lang="ts">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import Slider from "./Slider.svelte";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let disabled = false;

  $: memberState = app?.memberState;
  $: value = $memberState?.pencilEraserSize ?? 1;

  $: props = { value, theme, disabled };

  function set_pencil_eraser_size({ detail: value }: CustomEvent<number>) {
    app?.setPencilEraserSize(value);
  }
</script>

<Slider
  class="fastboard-toolbar-slider pencil-eraser-size"
  {...props}
  min={1}
  max={3}
  step={1}
  on:change={set_pencil_eraser_size}
/>
