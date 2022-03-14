<script lang="ts">
  import type { FastboardPlayer } from "@netless/fastboard-core";
  import type { Language, Theme } from "../../typings";
  import PlayerControl from "../PlayerControl";

  export let player: FastboardPlayer | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let containerRef: ((element: HTMLDivElement | null) => void) | undefined = undefined;

  const name = "fastboard";

  let container: HTMLDivElement;

  $: if (player && container) player.bindContainer(container);
  $: if (containerRef) containerRef(container || null);
</script>

<div class="{name}-root" class:loading={!player}>
  <div class="{name}-view" bind:this={container} />
  <div class="{name}-bottom">
    <PlayerControl {player} {theme} {language} />
  </div>
</div>
