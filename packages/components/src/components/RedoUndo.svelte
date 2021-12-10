<script context="module">
  export const name = "agora-whiteboard-redo-undo";
</script>

<script lang="ts">
  import type { Room } from "white-web-sdk";
  import type { RedoUndoProps, Theme } from "../types";
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import Undo from "../icons/Undo.svelte";
  import Redo from "../icons/Redo.svelte";

  export let room: Room | undefined = undefined;
  export let theme: Theme = "light";

  export let undoIcon: RedoUndoProps["undoIcon"] = undefined;
  export let redoIcon: RedoUndoProps["redoIcon"] = undefined;

  let undoSteps = 0;
  let redoSteps = 0;

  const updateUndoSteps = (e: number) => (undoSteps = e);
  const updateRedoSteps = (e: number) => (redoSteps = e);

  onMount(() => {
    const registerListeners = (room: Room) => {
      room.isWritable && (room.disableSerialization = false);
      room.callbacks.on("onCanUndoStepsUpdate", updateUndoSteps);
      room.callbacks.on("onCanRedoStepsUpdate", updateRedoSteps);
    };

    const removeListeners = (room: Room) => {
      room.callbacks.off("onCanUndoStepsUpdate", updateUndoSteps);
      room.callbacks.off("onCanRedoStepsUpdate", updateRedoSteps);
    };

    room && registerListeners(room);
    return () => room && removeListeners(room);
  });
</script>

<div class="{name} {theme}">
  <button
    class="{name}-item undo"
    disabled={undoSteps === 0}
    on:click={() => room && room.undo()}
  >
    {#if undoIcon}
      <Icon icon={undoIcon} type={undoSteps === 0 ? "disable" : "normal"} />
    {:else}
      <Undo {theme} />
    {/if}
  </button>
  <button
    class="{name}-item redo"
    disabled={redoSteps === 0}
    on:click={() => room && room.redo()}
  >
    {#if redoIcon}
      <Icon icon={redoIcon} type={redoSteps === 0 ? "disable" : "normal"} />
    {:else}
      <Redo {theme} />
    {/if}
  </button>
</div>

<style lang="scss">
  $name: "agora-whiteboard-redo-undo";
  div {
    display: inline-flex;
    gap: 8px;
    padding: 8px;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  button {
    appearance: none;
    cursor: pointer;
    margin: 0;
    border: 0;
    padding: 0;
    width: 1em;
    height: 1em;
    background-color: transparent;
    border-radius: 4px;
    font-size: 24px;
    line-height: 1;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: rgba(51, 129, 255, 0.1);
    }

    :global(svg),
    :global(img) {
      width: 1em;
      height: 1em;
    }
  }
  div.dark {
    background-color: #333;
    border: 1px solid rgba(0, 0, 0, 0.45);

    button:hover {
      background-color: rgba(51, 129, 255, 0.25);
    }
  }
</style>
