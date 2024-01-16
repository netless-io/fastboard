<script lang="ts">
  import type { Theme } from "../../../typings";
  import Button, { type ButtonProps } from "../../Button";
  import Icons from "../../Icons";

  export let btn_props: Partial<ButtonProps> = {};
  export let content: ButtonProps["content"] | undefined;
  export let theme: Theme = "light";
</script>

<Button class="clear" {...btn_props} on:click {content}>
  <Icons.Clear {theme} />
</Button>
