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
  export let force_show_toolbar: boolean | undefined = undefined;
  export let force_show_redo_undo: boolean | undefined = undefined;
  export let force_show_zoom_control: boolean | undefined = undefined;
  export let force_show_page_control: boolean | undefined = undefined;

  const name = "fastboard";
  const AppsShowToolbar = ["DocsViewer", "Slide", "PDFjs"];

  let container: HTMLDivElement;
  let layout: "hidden" | "toolbar-only" | "visible" = "hidden";
  let mounted = false;

  $: writable = app?.writable;
  $: boxState = app?.boxState;
  $: focusedApp = app?.focusedApp;
  $: visibleApps = app?.visibleApps;

  $: if (!$writable) {
    layout = "hidden";
  } else if (app?.appInMainViewPlugin) {
    if ($visibleApps && $visibleApps.size > 0) {
      if ( $boxState === "maximized" ) {
        if (AppsShowToolbar.some(kind => ($focusedApp || "").includes(kind))) {
          layout = "toolbar-only";
        } else {
          layout = "hidden";
        }
      } else {
        layout = "visible";
      }
    } else {
      layout = "visible";
    }
  } else if ($boxState === "maximized") {
    if ($focusedApp && AppsShowToolbar.some(kind => ($focusedApp || "").includes(kind))) {
      layout = "toolbar-only";
    } else {
      layout = "hidden";
    }
  } else {
    layout = "visible";
  }

  $: toolbar_has_items =
    !config.toolbar ||
    !config.toolbar.items ||
    !config.toolbar.apps ||
    config.toolbar.items.length > 0 ||
    config.toolbar.apps.enable !== false;

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

  let hidden_toolbar = false;
  $: if (force_show_toolbar === false) {
    hidden_toolbar = true;
  } else if (force_show_toolbar === true) {
    hidden_toolbar = false;
  } else {
    hidden_toolbar = !toolbar_has_items || !(layout === "visible" || layout === "toolbar-only");
  }

  let hidden_redo_undo = false;
  $: if (force_show_redo_undo === false) {
    hidden_redo_undo = true;
  } else if (force_show_redo_undo === true) {
    hidden_redo_undo = false;
  } else {
    hidden_redo_undo = layout !== "visible";
  }

  let hidden_zoom_control = false;
  $: if (force_show_zoom_control === false) {
    hidden_zoom_control = true;
  } else if (force_show_zoom_control === true) {
    hidden_zoom_control = false;
  } else {
    hidden_zoom_control = layout !== "visible";
  }

  let hidden_page_control = false;
  $: if (force_show_page_control === false) {
    hidden_page_control = true;
  } else if (force_show_page_control === true) {
    hidden_page_control = false;
  } else {
    hidden_page_control = layout !== "visible";
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
  <div
    class="{name}-{config.toolbar?.placement || 'left'}"
    class:hidden={hidden_toolbar}
  >
    {#if config.toolbar?.enable !== false}
      <Toolbar {app} {theme} {language} config={config.toolbar || {}} />
    {/if}
  </div>
  <div class="{name}-bottom-left" class:hidden={hidden_toolbar && hidden_redo_undo}>
    {#if config.redo_undo?.enable !== false && !hidden_redo_undo}
      <RedoUndo {app} {theme} {language} />
    {/if}
    {#if config.zoom_control?.enable !== false && !hidden_zoom_control}
      <ZoomControl {app} {theme} {language} />
    {/if}
  </div>
  <div class="{name}-bottom-right" class:hidden={hidden_page_control}>
    {#if config.page_control?.enable !== false}
      <PageControl {app} {theme} {language} />
    {/if}
  </div>
</div>
