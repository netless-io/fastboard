<script lang="ts">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { Language, Theme } from "../../typings";
  import RedoUndo from "../RedoUndo";
  import ZoomControl from "../ZoomControl";
  import PageControl from "../PageControl";
  import Toolbar from "../Toolbar";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let ref: ((element: HTMLElement) => void) | undefined = undefined;

  const name = "fastboard";

  let container: HTMLDivElement;

  $: if (app && container) app.bindContainer(container);
  $: if (ref && container) ref(container);
</script>

<div class="{name}-root" class:loading={!app}>
  <div class="{name}-view" bind:this={container} />
  <div class="{name}-left">
    <Toolbar {app} {theme} {language} />
  </div>
  <div class="{name}-bottom-left">
    <RedoUndo {app} {theme} {language} />
    <ZoomControl {app} {theme} {language} />
  </div>
  <div class="{name}-bottom-right">
    <PageControl {app} {theme} {language} />
  </div>
</div>
