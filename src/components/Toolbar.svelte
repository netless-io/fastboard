<script lang="ts" context="module">
  export const name = "agora-whiteboard-toolbar";
</script>

<script lang="ts">
  import type { Tool } from "../internal/typings";
  import ToolbarItem from "./ToolbarItem.svelte";

  export let position: "top" | "left" | "right" | "bottom" = "left";
  export let margin = 8;
  export let activeTool: Tool = "clicker";

  // TODO: update this variable from user config
  let enabledTools: Tool[] = ["drawer", "clicker"];

  function on_click_item({ detail: tool }: CustomEvent<Tool>) {
    activeTool = tool;
  }
</script>

<div class="{name} {position}" style="{position}: {margin}px">
  <div class="{name}-container">
    {#each enabledTools as tool (tool)}
      <ToolbarItem {tool} active={activeTool === tool} on:click={on_click_item} />
    {/each}
  </div>
</div>

<style lang="scss">
  $name: "agora-whiteboard-toolbar";
  .#{$name} {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    &.left {
      top: 0;
      height: 100%;
      .#{$name}-container {
        width: 38px;
        padding: 7px 0;
        flex-direction: column;
      }
    }
    &.top {
      left: 0;
      width: 100%;
      .#{$name}-container {
        height: 38px;
        padding: 0 7px;
      }
    }
  }
  .#{$name}-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 8px;
  }
</style>
