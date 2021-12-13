<script context="module">
  export const name = "fastboard-page-control";
</script>

<script lang="ts">
  import type { Room, RoomState, ViewVisionMode } from "white-web-sdk";
  import type { WindowManager } from "@netless/window-manager";
  import type { PageControlProps, Theme } from "../types";
  import { onMount } from "svelte";
  import FilePlus from "../icons/FilePlus.svelte";
  import ChevronLeft from "../icons/ChevronLeft.svelte";
  import ChevronRight from "../icons/ChevronRight.svelte";
  import Icon from "./Icon.svelte";

  export let room: Room | undefined = undefined;
  export let manager: WindowManager | undefined = undefined;
  export let theme: Theme = "light";

  export let addIcon: PageControlProps["addIcon"] = undefined;
  export let prevIcon: PageControlProps["prevIcon"] = undefined;
  export let nextIcon: PageControlProps["nextIcon"] = undefined;

  let disabled = false;
  let pageIndex = 1;
  let pageCount = 0;

  $: page = pageIndex + 1;

  const addPage = async () => {
    if (room?.isWritable) {
      const path = room.state.sceneState.scenePath;
      room.putScenes(path, [{}], pageIndex);
      if (manager) {
        await manager.setMainViewSceneIndex(pageIndex);
      }
    }
  };

  const prevPage = async () => {
    if (room?.isWritable) {
      if (manager) {
        manager.setMainViewSceneIndex(pageIndex - 1);
      } else {
        room.pptPreviousStep();
      }
    }
  };

  const nextPage = async () => {
    if (room?.isWritable) {
      if (manager) {
        manager.setMainViewSceneIndex(pageIndex + 1);
      } else {
        room.pptNextStep();
      }
    }
  };

  onMount(() => {
    const onEnableWriteNowChanged = (writable: boolean) => {
      disabled = !writable;
    };

    const onRoomStateChanged = (modifyState: Partial<RoomState>) => {
      if (modifyState.sceneState) {
        pageIndex = modifyState.sceneState.index;
        pageCount = modifyState.sceneState.scenes.length;
      }
    };

    const onMainViewModeChanged = (mode: number) => {
      if (room && mode === (0 as ViewVisionMode.Writable)) {
        pageIndex = room.state.sceneState.index;
        pageCount = room.state.sceneState.scenes.length;
      }
    };

    const addListeners = (room: Room, manager?: WindowManager) => {
      room.callbacks.on("onEnableWriteNowChanged", onEnableWriteNowChanged);
      room.callbacks.on("onRoomStateChanged", onRoomStateChanged);
      manager?.emitter.on("mainViewModeChange", onMainViewModeChanged);
    };

    const removeListeners = (room: Room, manager?: WindowManager) => {
      room.callbacks.off("onEnableWriteNowChanged", onEnableWriteNowChanged);
      room.callbacks.off("onRoomStateChanged", onRoomStateChanged);
      manager?.emitter.off("mainViewModeChange", onMainViewModeChanged);
    };

    if (room) {
      addListeners(room, manager);
      pageIndex = room.state.sceneState.index;
      pageCount = room.state.sceneState.scenes.length;
    }
    return () => room && removeListeners(room, manager);
  });
</script>

<div class="{name} {theme}">
  <button class="{name}-item add" {disabled} on:click={addPage}>
    {#if addIcon}
      <Icon icon={addIcon} alt="[add]" type="normal" />
    {:else}
      <FilePlus {theme} />
    {/if}
  </button>
  <span class="cut-line {theme}" />
  <button
    class="{name}-item prev"
    disabled={disabled || pageIndex === 0}
    on:click={prevPage}
  >
    {#if prevIcon}
      <Icon icon={prevIcon} alt="[prev]" type="normal" />
    {:else}
      <ChevronLeft {theme} />
    {/if}
  </button>
  <span class="page">{page}</span>
  <span class="slash">/</span>
  <span class="page-count">{pageCount}</span>
  <button
    class="{name}-item plus"
    disabled={disabled || pageIndex === pageCount - 1}
    on:click={nextPage}
  >
    {#if nextIcon}
      <Icon icon={nextIcon} alt="[next]" type="normal" />
    {:else}
      <ChevronRight {theme} />
    {/if}
  </button>
</div>

<style lang="scss">
  div {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px;
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
  .cut-line {
    background-color: #e7e7e7;
    height: 24px;
    width: 0.5px;
  }
  div.dark {
    background-color: #333;
    border: 1px solid rgba(0, 0, 0, 0.45);

    button:not(:disabled):hover {
      background-color: rgba(51, 129, 255, 0.25);
    }

    .cut-line {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
  .slash {
    opacity: 0.6;
  }
  span {
    font-size: 12px;
  }
</style>
