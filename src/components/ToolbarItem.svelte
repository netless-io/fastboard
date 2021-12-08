<script lang="ts" context="module">
  import type { Placement } from "tippy.js";
  import { ToolbarIcons } from "../internal/const";

  export const name = "agora-whiteboard-toolbar-item";
</script>

<script lang="ts">
  import type { Tool } from "../internal/typings";
  import { createEventDispatcher } from "svelte";
  import { tooltip } from "../actions/tooltip";

  export let tool: Tool;
  export let active = false;
  export let placement: Placement = "right";

  const [d, s, more] = ToolbarIcons[tool] ?? [];
  const dispatch = createEventDispatcher();

  function on_click() {
    dispatch("click", tool);
  }

  $: color = active ? "#3381FF" : "#1A1E21";
</script>

<button
  class="{name} {tool}"
  class:active
  data-tool={tool}
  on:click={on_click}
  use:tooltip={{
    content: tool,
    placement,
  }}
>
  <svg viewBox="0 0 24 24">
    {#if s == "fill"}
      <path {d} fill={color} />
    {:else}
      <path {d} stroke={color} fill="none" />
    {/if}
  </svg>
  {#if more && more.length > 0}
    <i />
  {/if}
</button>

<style lang="scss">
  button {
    appearance: none;
    width: 24px;
    height: 24px;
    padding: 0;
    user-select: none;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    outline: none;
    background-color: transparent;
    &:hover {
      background-color: rgba(51, 129, 255, 0.1);
    }
    > svg {
      pointer-events: none;
    }
    > i {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-left: 3px solid black;
      transform: rotate(45deg);
    }
  }
</style>
