<script lang="ts">
  import type { ApplianceNames } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import Button, { type ButtonProps } from "../../Button";
  import Icons from "../../Icons";

  export let btn_props: Partial<ButtonProps> = {};
  export let content: ButtonProps["content"] | undefined;
  export let appliance: ApplianceNames | undefined;
  export let theme: Theme = "light";
  export let menu: ButtonProps["menu"] | undefined;
  export let eraserType: string = "eraser";
</script>

<Button class="eraser" {...btn_props} on:click {content} {menu}>
  {#if eraserType === "eraser"}
    {#if appliance === "eraser"}
      <Icons.EraserFilled {theme} active />
    {:else}
      <Icons.Eraser {theme} />
    {/if}
  {:else if eraserType === "pencilEraser"}
    {#if appliance === "pencilEraser"}
      <Icons.EraserBitmapFilled {theme} active />
    {:else}
      <Icons.EraserBitmap {theme} />
    {/if}
  {/if}
</Button>
