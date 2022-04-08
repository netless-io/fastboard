<script lang="ts">
  import type { Appliance, FastboardApp } from "@netless/fastboard-core";
  import type { Writable } from "svelte/store";
  import type { Placement } from "tippy.js";
  import type { Language, Theme } from "../../../typings";
  import type { Shape } from "./constants";
  import { applianceShapes, shapesIcon, shapesIconActive } from "./constants";
  import { writable } from "svelte/store";
  import { scrollHeight } from "../../../actions/height";
  import { scrollTop } from "../../../actions/scroll";
  import { clamp } from "../../helpers";
  import { i18n } from "./constants";
  import { apps } from "../../../behaviors";
  import { tooltip } from "./helper";
  import Icons from "../../Icons";
  import Button from "../../Button";
  import StrokeWidth from "./StrokeWidth.svelte";
  import StrokeColor from "./StrokeColor.svelte";
  import TextColor from "./TextColor.svelte";
  import Shapes from "./Shapes.svelte";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let disabled = false;
  export let scroll_height: Writable<number>;
  export let computed_height = 0;
  export let scrollable = false;
  export let hide_apps = false;

  const name = "fastboard-toolbar";

  let last_shape: Shape = "rectangle";

  let pencil_panel: HTMLDivElement;
  let text_panel: HTMLDivElement;
  let shapes_panel: HTMLDivElement;
  let apps_panel: HTMLDivElement;

  let btn_props: { name: string; theme: Theme; disabled: boolean; placement: Placement };
  $: btn_props = { name, theme, disabled, placement: "right" };
  $: t = i18n[language];
  $: hotkeys = app?.hotKeys;
  $: c = {
    clicker: tooltip(t.clicker, hotkeys?.changeToClick),
    selector: tooltip(t.selector, hotkeys?.changeToSelector),
    pencil: tooltip(t.pencil, hotkeys?.changeToPencil),
    eraser: tooltip(t.eraser, hotkeys?.changeToEraser),
    text: tooltip(t.text, hotkeys?.changeToText),
  };
  $: memberState = app?.memberState;
  $: appliance = $memberState?.currentApplianceName;
  $: shape = $memberState?.shapeType;
  $: status = app?.appsStatus;

  $: if (applianceShapes.includes(appliance as Appliance)) {
    last_shape = appliance as Shape;
  } else if (shape) {
    last_shape = shape;
  }

  $: max_scroll = scrollable ? $scroll_height + (32 + 8) * 2 - computed_height : 0;

  let top = writable(0);

  function scroll_up() {
    $top = clamp($top - 32 - 4, 0, max_scroll);
  }
  function scroll_down() {
    $top = clamp($top + 32 + 4, 0, max_scroll);
  }

  function clicker() {
    app?.setAppliance("clicker");
  }
  function selector() {
    app?.setAppliance("selector");
  }
  function pencil() {
    app?.setAppliance("pencil");
  }
  function text() {
    app?.setAppliance("text");
  }
  function select_last_shape() {
    if (applianceShapes.includes(last_shape as Appliance)) {
      app?.setAppliance(last_shape as Appliance);
    } else {
      app?.setAppliance("shape", last_shape as Exclude<Shape, Appliance>);
    }
  }
  function eraser() {
    app?.setAppliance("eraser");
  }
  function clear() {
    app?.cleanCurrentScene();
  }
</script>

{#if scrollable}
  <Button class="scroll-up" {...btn_props} on:click={scroll_up}>
    <Icons.Up {theme} />
  </Button>
{/if}
<div class="{name}-scrollable" class:scrollable use:scrollHeight={scroll_height} use:scrollTop={top}>
  <Button class="clicker" {...btn_props} on:click={clicker} content={c.clicker}>
    {#if appliance === "clicker"}
      <Icons.ClickFilled {theme} active />
    {:else}
      <Icons.Click {theme} />
    {/if}
  </Button>
  <Button class="selector" {...btn_props} on:click={selector} content={c.selector}>
    {#if appliance === "selector"}
      <Icons.SelectorFilled {theme} active />
    {:else}
      <Icons.Selector {theme} />
    {/if}
  </Button>
  <Button class="pencil" {...btn_props} on:click={pencil} content={c.pencil} menu={pencil_panel}>
    {#if appliance === "pencil"}
      <Icons.PencilFilled {theme} active />
    {:else}
      <Icons.Pencil {theme} />
    {/if}
  </Button>
  <Button class="text" {...btn_props} on:click={text} content={c.text} menu={text_panel}>
    {#if appliance === "text"}
      <Icons.TextFilled {theme} active />
    {:else}
      <Icons.Text {theme} />
    {/if}
  </Button>
  <Button class="shapes" {...btn_props} on:click={select_last_shape} content={t.shapes} menu={shapes_panel}>
    {#if appliance === last_shape || (appliance === "shape" && shape === last_shape)}
      <svelte:component this={shapesIconActive[last_shape]} {theme} active />
    {:else}
      <svelte:component this={shapesIcon[last_shape]} {theme} />
    {/if}
  </Button>
  <Button class="eraser" {...btn_props} on:click={eraser} content={c.eraser}>
    {#if appliance === "eraser"}
      <Icons.EraserFilled {theme} active />
    {:else}
      <Icons.Eraser {theme} />
    {/if}
  </Button>
  <Button class="clear" {...btn_props} on:click={clear} content={t.clear}>
    <Icons.Clear {theme} />
  </Button>
  {#if !hide_apps}
    <Button class="apps" {...btn_props} content={t.apps} menu={apps_panel} menu_placement="right-end">
      <Icons.Apps {theme} />
    </Button>
  {/if}
</div>
{#if scrollable}
  <Button class="scroll-down" {name} {theme} {disabled} on:click={scroll_down}>
    <Icons.Down {theme} />
  </Button>
{/if}

<div class="{name}-panel-wrapper" style="display:none">
  <div class="{name}-panel pencil" bind:this={pencil_panel}>
    <StrokeWidth {app} {theme} {disabled} />
    <div class="{name}-panel-divider" />
    <StrokeColor {app} {theme} {disabled} />
  </div>
  <div class="{name}-panel text" bind:this={text_panel}>
    <TextColor {app} {theme} {disabled} />
  </div>
  <div class="{name}-panel shapes" bind:this={shapes_panel}>
    <Shapes {app} {theme} {language} {disabled} />
    <div class="{name}-panel-divider" />
    <StrokeWidth {app} {theme} {disabled} />
    <div class="{name}-panel-divider" />
    <StrokeColor {app} {theme} {disabled} />
  </div>
  <div class="{name}-panel apps" style="--n:{$apps.length}" bind:this={apps_panel}>
    {#each $apps as netless_app}
      {@const { icon, label, kind, onClick } = netless_app}
      {@const state = $status && $status[kind]}
      <button
        class="{name}-app-btn {kind} {theme}"
        class:is-loading={state && state.status === "loading"}
        class:is-failed={state && state.status === "failed"}
        title={label + (state && state.reason ? ": " + state.reason : "")}
        data-app-kind={netless_app.kind}
        disabled={state && state.status !== "idle"}
        on:click={app && onClick.bind(null, app)}
      >
        <img class="{name}-app-btn-icon {theme}" src={icon} alt={kind} title={label} />
        <span class="{name}-app-btn-text {theme}">{label}</span>
      </button>
    {/each}
  </div>
</div>
