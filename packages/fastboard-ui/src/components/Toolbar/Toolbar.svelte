<script lang="ts">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { Language, Theme } from "../../typings";
  import type { ToolbarConfig } from ".";
  import { writable as svelte_writable } from "svelte/store";
  import { height } from "../../actions/height";
  import { clamp } from "../helpers";
  import Contents from "./components/Contents.svelte";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let config: ToolbarConfig = {};

  const name = "fastboard-toolbar";
  const extra_height = (32 + 4 + 4) * 2;

  $: writable = app?.writable;
  $: disabled = !$writable;

  let collapsed = false;
  let container_height = svelte_writable(0);
  let scroll_height = svelte_writable(0);

  $: computed_height = clamp($container_height, extra_height, $scroll_height + extra_height);
  $: scrollable = $scroll_height + extra_height > $container_height;

  $: hide_dotted = config.pencil?.dotted === false;
  $: hide_apps = config.apps?.enable === false;
  $: eraser_type = config.eraser?.behavior || "both";
</script>

<div class="{name} {theme}" class:collapsed use:height={container_height}>
  <div class="{name}-contents {theme}" style:height={scrollable ? computed_height + "px" : "auto"}>
    <Contents
      {app}
      {theme}
      {language}
      {disabled}
      {scroll_height}
      {computed_height}
      {scrollable}
      {hide_dotted}
      {hide_apps}
      {eraser_type}
    />
  </div>
  <label class="{name}-handler {theme}">
    <input type="checkbox" bind:checked={collapsed} />
    <svg width="17" height="42" viewBox="0 0 17 42" fill="none">
      <path
        d="M0 41H12C14.2091 41 16 39.2091 16 37V5C16 2.79086 14.2091 1 12 1H0"
        stroke="#000"
        fill="#fff"
        class="{name}-handler-border-color {name}-handler-bg-color"
      />
      {#if collapsed}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 19L6 17V25L8 23L10 21L8 19ZM4 17H5V25H4V17Z"
          fill="#fff"
          class="{name}-handler-image-fill-color"
        />
      {:else}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 19L8 17V25L6 23L4 21L6 19ZM10 17H9V25H10V17Z"
          fill="#fff"
          class="{name}-handler-image-fill-color"
        />
      {/if}
    </svg>
  </label>
</div>
