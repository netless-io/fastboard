<script lang="ts">
  import type { FastboardApp, ExtendMemberState } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import Slider from "./Slider.svelte";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let disabled = false;

  $: memberState = app?.memberState;
  $: value = $memberState?.pencilEraserSize ?? 1;

  $: props = { value, theme, disabled };

  function set_eraser_size({ detail: value }: CustomEvent<number>) {
    app?.appliancePlugin?.setMemberState({
      pencilEraserSize: value,
    } as ExtendMemberState);
  }
</script>

<Slider class="fastboard-toolbar-slider" {...props} min={1} max={4} on:change={set_eraser_size} />
