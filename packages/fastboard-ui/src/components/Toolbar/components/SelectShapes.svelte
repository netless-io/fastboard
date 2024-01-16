<script lang="ts" context="module">
  import type { I18nData, Language, Theme } from "../../../typings";
  import type { Shape } from "./constants";

  const i18n: I18nData<Shape> = {
    en: {
      rectangle: "Rectangle",
      ellipse: "Ellipse",
      straight: "Line",
      arrow: "Arrow",
      pentagram: "Star",
      rhombus: "Diamond",
      triangle: "Triangle",
      speechBalloon: "Balloon",
    },
    "zh-CN": {
      rectangle: "矩形",
      ellipse: "椭圆",
      straight: "直线",
      arrow: "箭头",
      pentagram: "五角星",
      rhombus: "菱形",
      triangle: "三角形",
      speechBalloon: "气泡",
    },
  };
</script>

<script lang="ts">
  import type { Appliance, FastboardApp, HotKey } from "@netless/fastboard-core";
  import { tippy } from "../../../actions/tippy";
  import { shapes, shapesIcon, shapesIconActive, applianceShapes } from "./constants";
  import { tooltip } from "./helper";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let disabled = false;

  $: t = i18n[language];
  $: memberState = app?.memberState;
  $: appliance = $memberState?.currentApplianceName;
  $: shape = $memberState?.shapeType;
  $: hotkeys = app?.hotKeys;
  let c: Partial<Record<Shape, HotKey>>;
  $: c = {
    rectangle: hotkeys?.changeToRectangle,
    ellipse: hotkeys?.changeToEllipse,
    straight: hotkeys?.changeToStraight,
    arrow: hotkeys?.changeToArrow,
  };

  function set_appliance_or_shape(ev: MouseEvent) {
    let button = ev.target as HTMLButtonElement | null;
    if (button && button.dataset.shapeKey) {
      let shape = button.dataset.shapeKey as Shape;
      if (shape && app) {
        if (applianceShapes.includes(shape as Appliance)) {
          app.setAppliance(shape as Appliance);
        } else {
          app.setAppliance("shape", shape as Exclude<Shape, Appliance>);
        }
      }
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fastboard-toolbar-shapes {theme}" on:click={set_appliance_or_shape}>
  {#each shapes as key (key)}
    {@const is_selected = appliance === "shape" ? shape === key : appliance === key}
    <button
      class="fastboard-toolbar-btn fastboard-toolbar-shape-btn {theme} {key}"
      class:is-active={is_selected}
      data-shape-key={key}
      {disabled}
      use:tippy={{ content: tooltip(t[key], c[key]), placement: "top" }}
    >
      {#if is_selected}
        <svelte:component this={shapesIconActive[key]} {theme} active />
      {:else}
        <svelte:component this={shapesIcon[key]} {theme} />
      {/if}
    </button>
  {/each}
</div>
