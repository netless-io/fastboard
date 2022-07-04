<svelte:options immutable />

<script lang="ts">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { Language, Theme, FastboardUIConfig } from "../../typings";
  import { onMount } from "svelte";
  import { tippy_hide_all } from "../../actions/tippy";
  import RedoUndo from "../RedoUndo";
  import ZoomControl from "../ZoomControl";
  import PageControl from "../PageControl";
  import Toolbar from "../Toolbar";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let containerRef: ((element: HTMLDivElement | null) => void) | undefined = undefined;
  export let config: FastboardUIConfig = {};

  const name = "fastboard";
  const AppsShowToolbar = ["DocsViewer", "Slide"];

  let container: HTMLDivElement;
  let layout: "hidden" | "toolbar-only" | "visible" = "hidden";
  let mounted = false;

  $: writable = app?.writable;
  $: boxState = app?.boxState;
  $: focusedApp = app?.focusedApp;

  $: if (!$writable) {
    layout = "hidden";
  } else if ($boxState === "maximized") {
    if ($focusedApp && AppsShowToolbar.some(kind => ($focusedApp || "").includes(kind))) {
      layout = "toolbar-only";
    } else {
      layout = "hidden";
    }
  } else {
    layout = "visible";
  }

  $: try {
    if (app && container) {
      app.bindContainer(container);
      mounted = true;
    }
  } catch (err) {
    console.error("[fastboard] An error occurred while binding container");
    console.error(err);
  }

  $: if (app && theme && mounted) {
    app.manager.setPrefersColorScheme(theme);
  }

  onMount(() => {
    if (containerRef) {
      containerRef(container);
      return () => {
        if (containerRef) containerRef(null);
      };
    }
  });

  function focus_me() {
    tippy_hide_all();
    // workaround for some devices that enabled "windows ink"
    let a = document.activeElement as HTMLElement | null;
    a && a.blur && a.blur();
  }
</script>

<div class="{name}-root" class:loading={!app}>
  <div class="{name}-view" bind:this={container} on:touchstart|capture={focus_me} />
  <div class="{name}-left" class:hidden={!(layout === "visible" || layout === "toolbar-only")}>
    {#if config.toolbar?.enable !== false}
      <Toolbar {app} {theme} {language} config={config.toolbar} />
    {/if}
  </div>
  <div class="{name}-bottom-left" class:hidden={layout !== "visible"}>
    {#if config.redo_undo?.enable !== false}
      <RedoUndo {app} {theme} {language} />
    {/if}
    {#if config.zoom_control?.enable !== false}
      <ZoomControl {app} {theme} {language} />
    {/if}
  </div>
  <div class="{name}-bottom-right" class:hidden={layout !== "visible"}>
    {#if config.page_control?.enable !== false}
      <PageControl {app} {theme} {language} />
    {/if}
  </div>
</div>
