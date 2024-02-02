<script lang="ts">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { Writable } from "svelte/store";
  import type { Language, Theme, ToolbarItem } from "../../../typings";
  import { writable } from "svelte/store";
  import { scrollHeight } from "../../../actions/height";
  import { scrollTop } from "../../../actions/scroll";
  import { tippy_hide_all } from "../../../actions/tippy";
  import { clamp } from "../../helpers";
  import { i18n } from "./constants";
  import { apps } from "../../../behaviors";
  import { tooltip } from "./helper";
  import Icons from "../../Icons";
  import Button, { type ButtonProps } from "../../Button";

  import StrokeWidth from "./StrokeWidth.svelte";
  import StrokeColor from "./StrokeColor.svelte";
  import TextColor from "./TextColor.svelte";
  import SelectShapes from "./SelectShapes.svelte";

  import Clicker from "../definitions/Clicker.svelte";
  import Selector from "../definitions/Selector.svelte";
  import Pencil from "../definitions/Pencil.svelte";
  import Text from "../definitions/Text.svelte";
  import Shapes from "../definitions/Shapes.svelte";
  import Eraser from "../definitions/Eraser.svelte";
  import Clear from "../definitions/Clear.svelte";
  import Hand from "../definitions/Hand.svelte";
  import Laser from "../definitions/Laser.svelte";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let disabled = false;
  export let scroll_height: Writable<number>;
  export let computed_height = 0;
  export let scrollable = false;
  export let placement: "left" | "right" = "left";
  export let items: ToolbarItem[] = ["clicker", "selector", "pencil", "text", "shapes", "eraser", "clear"];
  export let hide_apps = false;

  const name = "fastboard-toolbar";

  let pencil_panel: HTMLDivElement;
  let text_panel: HTMLDivElement;
  let shapes_panel: HTMLDivElement;
  let apps_panel: HTMLDivElement;

  let btn_props: Partial<ButtonProps>;
  $: btn_props = {
    name,
    theme,
    disabled,
    placement: placement === "left" ? "right" : "left",
    menu_placement: placement === "left" ? "right-start" : "left-start",
  };

  $: t = i18n[language];
  $: hotkeys = app?.hotKeys;
  $: c = {
    clicker: tooltip(t.clicker, hotkeys?.changeToClick),
    selector: tooltip(t.selector, hotkeys?.changeToSelector),
    pencil: tooltip(t.pencil, hotkeys?.changeToPencil),
    eraser: tooltip(t.eraser, hotkeys?.changeToEraser),
    text: tooltip(t.text, hotkeys?.changeToText),
    hand: tooltip(t.hand, hotkeys?.changeToHand),
    laserPointer: tooltip(t.laserPointer, hotkeys?.changeToLaserPointer),
  };

  $: memberState = app?.memberState;
  $: appliance = $memberState?.currentApplianceName;
  $: status = app?.appsStatus;

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
  function eraser() {
    app?.setAppliance("eraser");
  }
  function hand() {
    app?.setAppliance("hand");
  }
  function laserPointer() {
    app?.setAppliance("laserPointer");
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
  {#each items as item}
    {#if item === "clicker"}
      <Clicker {appliance} {theme} {btn_props} on:click={clicker} content={c.clicker} />
    {:else if item === "selector"}
      <Selector {appliance} {theme} {btn_props} on:click={selector} content={c.selector} />
    {:else if item === "pencil"}
      <Pencil {appliance} {theme} {btn_props} on:click={pencil} content={c.pencil} menu={pencil_panel} />
    {:else if item === "text"}
      <Text {appliance} {theme} {btn_props} on:click={text} content={c.text} menu={text_panel} />
    {:else if item === "shapes"}
      <Shapes {app} {appliance} {theme} {btn_props} content={t.shapes} menu={shapes_panel} />
    {:else if item === "eraser"}
      <Eraser {appliance} {theme} {btn_props} on:click={eraser} content={c.eraser} />
    {:else if item === "clear"}
      <Clear {theme} {btn_props} on:click={clear} content={t.clear} />
    {:else if item === "hand"}
      <Hand {appliance} {theme} {btn_props} on:click={hand} content={c.hand} />
    {:else if item === "laserPointer"}
      <Laser {appliance} {theme} {btn_props} on:click={laserPointer} content={c.laserPointer} />
    {/if}
  {/each}
  {#if !hide_apps}
    <Button
      class="apps"
      {...btn_props}
      content={t.apps}
      menu={apps_panel}
      menu_placement={placement === "left" ? "right-end" : "left-end"}
    >
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
    <SelectShapes {app} {theme} {language} {disabled} />
    <div class="{name}-panel-divider" />
    <StrokeWidth {app} {theme} {disabled} />
    <div class="{name}-panel-divider" />
    <StrokeColor {app} {theme} {disabled} />
  </div>
  <div class="{name}-panel apps" style="--n:{$apps.length}" bind:this={apps_panel}>
    {#each $apps as netless_app}
      {@const { icon, label, kind, onClick } = netless_app}
      {@const state = $status && $status[kind]}
      {@const on_click = () => {
        app && onClick(app);
        tippy_hide_all();
      }}
      <button
        class="{name}-app-btn {kind} {theme}"
        class:is-loading={state && state.status === "loading"}
        class:is-failed={state && state.status === "failed"}
        title={label + (state && state.reason ? ": " + state.reason : "")}
        data-app-kind={netless_app.kind}
        disabled={state && state.status !== "idle"}
        on:click={on_click}
      >
        <img class="{name}-app-btn-icon {theme}" src={icon} alt={kind} title={label} />
        <span class="{name}-app-btn-text {theme}">{label}</span>
      </button>
    {/each}
  </div>
</div>
