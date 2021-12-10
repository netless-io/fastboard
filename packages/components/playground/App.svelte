<script lang="ts">
  import { RedoUndo } from "../src";
  import { room, trigger } from "./mock/room";

  let dark = false;
  let redoUndo = true;

  $: document.documentElement.style.colorScheme = dark ? "dark" : "light";
</script>

<div class="wrapper" class:dark>
  <div class="left">
    <div class="toolbar" />
  </div>

  <div class="bottom-left">
    <div class="redo-undo">
      {#if redoUndo}<RedoUndo theme={dark ? "dark" : "light"} {room} />{/if}
    </div>
    <div class="resize" />
  </div>

  <div class="bottom-hang">
    <label>
      <input type="checkbox" bind:checked={dark} />
      DARK
    </label><br />
    <label>
      <input type="checkbox" bind:checked={redoUndo} />
      REDO UNDO
    </label>
    <button on:click={() => trigger("onCanUndoStepsUpdate", 1)}>
      SET UNDO 1
    </button>
    <button on:click={() => trigger("onCanUndoStepsUpdate", 0)}>
      SET UNDO 0
    </button>
    <button on:click={() => trigger("onCanRedoStepsUpdate", 1)}>
      SET REDO 1
    </button>
    <button on:click={() => trigger("onCanRedoStepsUpdate", 0)}>
      SET REDO 0
    </button>
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    inset: 0;
    background-color: #fff;
    &.dark {
      background-color: #121212;
    }
  }
  $unit: 8px;
  .bottom-left {
    position: absolute;
    bottom: $unit;
    left: $unit;
    padding: $unit;
  }
  .bottom-hang {
    position: absolute;
    top: 100%;
    padding: 8px;
    user-select: none;
    label {
      cursor: pointer;
    }
  }
</style>
