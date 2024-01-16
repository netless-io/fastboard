<script lang="ts">
  import type { Appliance, ApplianceNames, FastboardApp } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import { applianceShapes, shapesIcon, shapesIconActive, type Shape } from "../components/constants";
  import Button, { type ButtonProps } from "../../Button";

  export let app: FastboardApp | null | undefined = null;
  export let btn_props: Partial<ButtonProps> = {};
  export let content: ButtonProps["content"] | undefined;
  export let menu: ButtonProps["menu"] | undefined;
  export let appliance: ApplianceNames | undefined;
  export let theme: Theme = "light";

  $: memberState = app?.memberState;
  $: appliance = $memberState?.currentApplianceName;
  $: shape = $memberState?.shapeType;

  let last_shape: Shape = "rectangle";

  $: if (applianceShapes.includes(appliance as Appliance)) {
    last_shape = appliance as Shape;
  } else if (shape) {
    last_shape = shape;
  }

  function select_last_shape() {
    if (applianceShapes.includes(last_shape as Appliance)) {
      app?.setAppliance(last_shape as Appliance);
    } else {
      app?.setAppliance("shape", last_shape as Exclude<Shape, Appliance>);
    }
  }
</script>

<Button class="shapes" {...btn_props} on:click={select_last_shape} {content} {menu}>
  {#if appliance === last_shape || (appliance === "shape" && shape === last_shape)}
    <svelte:component this={shapesIconActive[last_shape]} {theme} active />
  {:else}
    <svelte:component this={shapesIcon[last_shape]} {theme} />
  {/if}
</Button>
