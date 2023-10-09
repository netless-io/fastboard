<svelte:options immutable />

<script lang="ts">
  import type { FastboardPlayer } from "@netless/fastboard-core";
  import type { Language, ReplayFastboardUIConfig, Theme } from "../../typings";
  import { onMount } from "svelte";
  import { tippy_hide_all } from "../../actions/tippy";
  import PlayerControl from "../PlayerControl";

  export let player: FastboardPlayer | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let containerRef: ((element: HTMLDivElement | null) => void) | undefined = undefined;
  export let config: ReplayFastboardUIConfig = {};

  const name = "fastboard";

  let container: HTMLDivElement;
  let mounted = false;

  $: try {
    if (player && container) {
      player.bindContainer(container);
      mounted = true;
    }
  } catch (err) {
    console.error("[fastboard] An error occurred while binding container");
    console.error(err);
  }

  $: if (player && theme && mounted) {
    player.manager.setPrefersColorScheme(theme);
  }

  onMount(() => {
    if (containerRef) {
      containerRef(container);
      return () => {
        if (containerRef) containerRef(null);
      };
    }
  });

  function focus_me() {
    tippy_hide_all();
    // workaround for some devices that enabled "windows ink"
    let a = document.activeElement as HTMLElement | null;
    a && a.blur && a.blur();
  }
</script>

<div class="{name}-root" class:loading={!player}>
  <div class="{name}-view" bind:this={container} on:touchstart|capture={focus_me} />
  <div class="{name}-bottom">
    {#if config.player_control?.enable !== false}
      <PlayerControl {player} {theme} {language} />
    {/if}
  </div>
</div>
