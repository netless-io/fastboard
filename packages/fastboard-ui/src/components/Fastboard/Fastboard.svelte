<script lang="ts">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { Language, Theme } from "../../typings";
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

  const name = "fastboard";
  const AppsShowToolbar = ["DocsViewer", "Slide"];

  let container: HTMLDivElement;
  let layout: "hidden" | "toolbar-only" | "visible" = "hidden";

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
    if (app && container) app.bindContainer(container);
  } catch (err) {
    console.error("[fastboard] An error occurred while binding container");
    console.error(err);
  }

  $: if (app && theme) {
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
</script>

<div class="{name}-root" class:loading={!app}>
  <div class="{name}-view" bind:this={container} on:touchstart|capture={tippy_hide_all} />
  <div class="{name}-left" class:hidden={!(layout === "visible" || layout === "toolbar-only")}>
    <Toolbar {app} {theme} {language} />
  </div>
  <div class="{name}-bottom-left" class:hidden={layout !== "visible"}>
    <RedoUndo {app} {theme} {language} />
    <ZoomControl {app} {theme} {language} />
  </div>
  <div class="{name}-bottom-right" class:hidden={layout !== "visible"}>
    <PageControl {app} {theme} {language} />
  </div>
</div>
