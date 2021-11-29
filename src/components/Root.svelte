<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { Instance } from "../internal";

  export let instance: Instance;
  let whiteboard_view: HTMLDivElement;

  setContext(Instance.Context, { instance });

  onMount(() => {
    instance.mount(whiteboard_view);
    return () => instance.unmount();
  });
</script>

<div class="agora-whiteboard-root">
  <div class="agora-whiteboard-view" bind:this={whiteboard_view} />
</div>

<style>
  .agora-whiteboard-root {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .agora-whiteboard-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
