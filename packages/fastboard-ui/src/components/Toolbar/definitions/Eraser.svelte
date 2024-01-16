<script lang="ts">
  import type { ApplianceNames } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import Button, { type ButtonProps } from "../../Button";
  import Icons from "../../Icons";

  export let btn_props: Partial<ButtonProps> = {};
  export let content: ButtonProps["content"] | undefined;
  export let appliance: ApplianceNames | undefined;
  export let theme: Theme = "light";
</script>

<Button class="eraser" {...btn_props} on:click {content}>
  {#if appliance === "eraser"}
    <Icons.EraserFilled {theme} active />
  {:else}
    <Icons.Eraser {theme} />
  {/if}
</Button>
