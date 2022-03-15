<script lang="ts">
  import type { FastboardPlayer } from "@netless/fastboard-core";
  import type { Language, Theme } from "../../typings";
  import { onMount } from "svelte";
  import { tippy_hide_all } from "../../actions/tippy";
  import PlayerControl from "../PlayerControl";

  export let player: FastboardPlayer | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let containerRef: ((element: HTMLDivElement | null) => void) | undefined = undefined;

  const name = "fastboard";

  let container: HTMLDivElement;

  $: try {
    if (player && container) player.bindContainer(container);
  } catch (err) {
    console.error("[fastboard] An error occurred while binding container");
    console.error(err);
  }

  $: if (player && theme) {
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
</script>

<div class="{name}-root" class:loading={!player}>
  <div class="{name}-view" bind:this={container} on:touchstart|capture={tippy_hide_all} />
  <div class="{name}-bottom">
    <PlayerControl {player} {theme} {language} />
  </div>
</div>
