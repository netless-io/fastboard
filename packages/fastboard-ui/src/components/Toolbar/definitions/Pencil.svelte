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
  {#if appliance === "pencil" && pencilType === "mark"}
    <Icons.MarkPenFilled {theme} active />
  {:else if appliance === "pencil" && pencilType === "laser"}
    <Icons.LaserPenFilled {theme} active />
  {:else if appliance === "pencil" && pencilType === "pencil"}
    <Icons.PencilFilled {theme} active />
  {:else}
    <Icons.Pencil {theme} />
  {/if}
</Button>
