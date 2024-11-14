<script lang="ts">
  import type { Color, FastboardApp } from "@netless/fastboard-core";
  import type { Language, Theme, ToolbarConfig } from "../../typings";
  import { writable as svelte_writable } from "svelte/store";
  import { height } from "../../actions/height";
  import { clamp } from "../helpers";
  import { default_items, default_colors } from "./components/constants";
  import Contents from "./components/Contents.svelte";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let config: ToolbarConfig = {};
  export let colors: Color[] | undefined = undefined;

  const name = "fastboard-toolbar";
  const extra_height = (32 + 4 + 4) * 2;

  $: writable = app?.writable;
  $: phase = app?.phase;
  $: disabled = !($writable && $phase === "connected");

  let collapsed = config.collapsed;
  let container_height = svelte_writable(0);
  let scroll_height = svelte_writable(0);

  $: computed_height = clamp($container_height, extra_height, $scroll_height + extra_height);
  $: scrollable = $scroll_height + extra_height > $container_height;

  $: placement = config.placement || "left";
  $: items = config.items || default_items;
  $: hide_apps = config.apps?.enable === false;

  $: if (app?.manager && app?.manager.room) {
    if (colors && !config.colors?.length) {
      const floatBarOptions = (app?.manager.room as any).floatBarOptions as { colors?: Color[] };
      if (floatBarOptions.colors) {
        colors = floatBarOptions.colors as Color[];
      }
    } else {
      colors = config.colors;
    }
  } else {
    colors = default_colors;
  }
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
      {placement}
      {items}
      {hide_apps}
      {colors}
    />
  </div>
  <label class="{name}-handler {theme}">
    <input type="checkbox" bind:checked={collapsed} />
    <svg fill="none" stroke-width="2" viewBox="0 0 32 120">
      <path
        fill="#fff"
        stroke="none"
        d="m0 0 24 16q6 4 6 14v60q0 10-6 14L0 120"
        class="{name}-handler-bg-color"
      />
      <path stroke="#000" d="m0 0 24 16q6 4 6 14v60q0 10-6 14L0 120" class="{name}-handler-border-color" />
      {#if collapsed}
        <path stroke="#000" d="M10 52v16" class="{name}-handler-image-stroke-color" />
        <path fill="#000" stroke="none" d="M14 52v16l8-8z" class="{name}-handler-image-fill-color" />
      {:else}
        <path stroke="#000" d="M20 52v16" class="{name}-handler-image-stroke-color" />
        <path fill="#000" stroke="none" d="M16 52v16l-8-8z" class="{name}-handler-image-fill-color" />
      {/if}
    </svg>
  </label>
</div>
