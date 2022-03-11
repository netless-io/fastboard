<script lang="ts">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import Slider from "./Slider.svelte";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let disabled = false;

  $: memberState = app?.memberState;
  $: value = $memberState?.strokeWidth ?? 1;

  $: props = { value, theme, disabled };

  function set_stroke_width({ detail: value }: CustomEvent<number>) {
    app?.setStrokeWidth(value);
  }
</script>

<Slider class="fastboard-toolbar-slider" {...props} min={1} max={32} on:change={set_stroke_width} />
