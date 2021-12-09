<script lang="ts" context="module">
  export const name = "agora-whiteboard-redo-undo";
</script>

<script lang="ts">
  import type { Room } from "white-web-sdk";
  import type { WindowManager } from "@netless/window-manager";
  import type { Theme } from "../types";

  export const room: Room | undefined = undefined;
  export const manager: WindowManager | undefined = undefined;
  export const theme: Theme = "light";
</script>

<div class={name}>
  <button class="{name}-item undo">Undo</button>
  <button class="{name}-item redo">Redo</button>
</div>

<style lang="scss">
  $name: "agora-whiteboard-redo-undo";
  div {
    flex-grow: 1;
  }
</style>
