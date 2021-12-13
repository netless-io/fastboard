<script context="module">
  export const name = "fastboard-zoom-control";
</script>

<script lang="ts">
  import type { WindowManager } from "@netless/window-manager";
  import type { Camera } from "white-web-sdk";
  import type { Theme, ZoomControlProps } from "../types";
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import Reset from "../icons/Reset.svelte";
  import Less from "../icons/Less.svelte";
  import Plus from "../icons/Plus.svelte";

  export let manager: WindowManager | undefined = undefined;

  export let resetIcon: ZoomControlProps["resetIcon"] = undefined;
  export let lessIcon: ZoomControlProps["lessIcon"] = undefined;
  export let plusIcon: ZoomControlProps["plusIcon"] = undefined;
  export let theme: Theme = "light";

  let scale = 1;

  onMount(() => {
    const cameraListener = (camera: Camera) => (scale = camera.scale);
    manager?.mainView.callbacks.on("onCameraUpdated", cameraListener);
    return () => {
      manager?.mainView.callbacks.off("onCameraUpdated", cameraListener);
    };
  });

  const resetCamera = () => {
    manager?.mainView.moveCamera({
      scale: 1,
      centerX: 0,
      centerY: 0,
    });
  };
</script>

<div class="{name} {theme}">
  <button class="{name} reset" on:click={resetCamera}>
    {#if resetIcon}
      <Icon icon={resetIcon} alt="[reset]" type="normal" />
    {:else}
      <Reset {theme} />
    {/if}
  </button>
  <span class="cut-line {theme}" />
  <button class="{name} less">
    {#if lessIcon}
      <Icon icon={lessIcon} alt="[less]" type="normal" />
    {:else}
      <Less {theme} />
    {/if}
  </button>

  <span>{Math.ceil(scale * 100)}</span> <span class="{name} percent">%</span>

  <button class="{name} plus">
    {#if plusIcon}
      <Icon icon={plusIcon} alt="[plus]" type="normal" />
    {:else}
      <Plus {theme} />
    {/if}
  </button>
</div>

<style lang="scss">
  $name: "fastboard-zoom-control";
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
  div.dark {
    background-color: #333;
    border: 1px solid rgba(0, 0, 0, 0.45);

    button:not(:disabled):hover {
      background-color: rgba(51, 129, 255, 0.25);
    }
  }
  .cut-line {
    background-color: #e7e7e7;
    height: 24px;
    width: 0.5px;
  }
  .cut-line.dark {
    background-color: rgba(255, 255, 255, 0.15);
  }
  .percent {
    opacity: 0.6;
  }
  span {
    font-size: 12px;
  }
</style>
