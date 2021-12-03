<script lang="ts">
  export let title = "";

  let dragging = false;
  let saved_pos = { x: 0, y: 0, width: 200, height: 200 };
  let width = 200;
  let height = 200;
  let drag_handler: HTMLElement;
  function on_down(e: PointerEvent) {
    if (e.target === drag_handler) {
      saved_pos = { x: e.x, y: e.y, width, height };
      dragging = true;
    }
  }
  function on_move(e: PointerEvent) {
    if (dragging) {
      let dx = Math.round(e.clientX - saved_pos.x);
      let dy = Math.round(e.clientY - saved_pos.y);
      width = Math.max(saved_pos.width + dx, 8);
      height = Math.max(saved_pos.height + dy, 8);
    }
  }
  function on_up() {
    dragging = false;
  }
</script>

<div class="card-wrapper">
  <div class="card" style="width: {width}px; height: {height}px">
    <slot />
    <h3>{title}</h3>
    <span class="drag-handler" class:dragging bind:this={drag_handler} />
    <samp class="size">{width}x{height}</samp>
  </div>
</div>

<svelte:window on:pointerdown={on_down} on:pointermove={on_move} on:pointerup={on_up} />

<style lang="scss">
  .card-wrapper {
    position: relative;
    touch-action: none;
  }
  .card {
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
      0 3px 5px -1px rgba(0, 0, 0, 0.4);
  }
  h3 {
    z-index: 9999;
    margin: 0;
    font-weight: normal;
    font-size: 16px;
    position: absolute;
    right: 8px;
    bottom: 8px;
    cursor: default;
    user-select: none;
  }
  .drag-handler {
    z-index: 9999;
    position: absolute;
    right: -10px;
    bottom: -10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba($color: #000000, $alpha: 0.1);
    cursor: grab;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    &.dragging {
      cursor: grabbing;
    }
  }
  .drag-handler:hover {
    opacity: 1;
  }
  .size {
    z-index: 9999;
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 12px;
    color: rgba($color: #000000, $alpha: 0.5);
    cursor: text;
  }
</style>
