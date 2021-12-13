<script lang="ts">
  import { RedoUndo, ZoomControl, PageControl } from "../src";
  import { room, trigger } from "./mock/room";

  let dark = false;
  let redo_undo = true;
  let zoom_control = true;
  let page_control = true;

  $: document.documentElement.style.colorScheme = dark ? "dark" : "light";
</script>

<div class="wrapper" class:dark>
  <div class="left">
    <div class="toolbar" />
  </div>

  <div class="bottom-left">
    {#if redo_undo}<RedoUndo theme={dark ? "dark" : "light"} {room} />{/if}
    {#if zoom_control}<ZoomControl theme={dark ? "dark" : "light"} />{/if}
    <div class="resize" />
  </div>

  <div class="bottom-right">
    {#if page_control}<PageControl
        theme={dark ? "dark" : "light"}
        {room}
      />{/if}
  </div>

  <div class="bottom-hang">
    <label>
      <input type="checkbox" bind:checked={dark} />
      Dark
    </label><br />

    <label>
      <input type="checkbox" bind:checked={redo_undo} />
      RedoUndo
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
    </button><br />

    <label>
      <input type="checkbox" bind:checked={zoom_control} />
      Zoom
    </label><br />

    <label>
      <input type="checkbox" bind:checked={page_control} />
      Pages
    </label><br />
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
    display: flex;
    gap: 10px;
    position: absolute;
    bottom: $unit;
    left: $unit;
    padding: $unit;
  }
  .bottom-right {
    @extend .bottom-left;
    left: auto;
    right: $unit;
  }
  .bottom-hang {
    position: absolute;
    top: 100%;
    padding-top: 8px;
    user-select: none;
    label {
      cursor: pointer;
    }
  }
</style>
