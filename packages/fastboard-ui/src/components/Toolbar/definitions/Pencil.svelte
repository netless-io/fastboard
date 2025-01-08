<script lang="ts">
  import type { ApplianceNames } from "@netless/fastboard-core";
  import type { Theme } from "../../../typings";
  import Button, { type ButtonProps } from "../../Button";
  import Icons from "../../Icons";

  export let btn_props: Partial<ButtonProps> = {};
  export let content: ButtonProps["content"] | undefined;
  export let menu: ButtonProps["menu"] | undefined;
  export let appliance: ApplianceNames | undefined;
  export let theme: Theme = "light";
  export let pencilType: string = "pencil";
</script>

<Button class="pencil" {...btn_props} on:click {content} {menu}>
  {#if pencilType === "mark"}
    {#if appliance === "pencil"}
      <Icons.MarkPenFilled {theme} active />
    {:else}
      <Icons.MarkPen {theme} />
    {/if}
  {:else if pencilType === "laser"}
    {#if appliance === "pencil"}
      <Icons.LaserPenFilled {theme} active />
    {:else}
      <Icons.LaserPen {theme} />
    {/if}
  {:else if pencilType === "pencil"}
    {#if appliance === "pencil"}
      <Icons.PencilFilled {theme} active />
    {:else}
      <Icons.Pencil {theme} />
    {/if}
  {/if}
</Button>
