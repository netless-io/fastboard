<script lang="ts" context="module">
  import type { FastboardPlayer } from "@netless/fastboard-core";
  import type { GenericIcon, I18nData, IconType, Language, Theme } from "../../typings";

  const speeds = [2.0, 1.5, 1.25, 1.0, 0.75, 0.5];

  const i18n: I18nData<"play" | "pause" | "speed"> = {
    en: {
      play: "Play",
      pause: "Pause",
      speed: "Speed",
    },
    "zh-CN": {
      play: "播放",
      pause: "暂停",
      speed: "速度",
    },
  };

  function format(ms: number) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return String(m).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }
</script>

<script lang="ts">
  import Icon from "../Icon";
  import Icons from "../Icons";
  import Button from "../Button";
  import Slider from "../Toolbar/components/Slider.svelte";

  export let player: FastboardPlayer | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let icons: GenericIcon<"play" | "pause" | "loading"> | undefined = undefined;

  const name = "fastboard-player-control";

  $: t = i18n[language];

  let type: IconType;
  $: type = disabled ? "disable" : "normal";

  $: canPlay = player?.canplay;
  $: disabled = !canPlay;
  $: duration = player?.duration;
  $: current = player?.currentTime;
  $: speed = player?.speed;

  $: phase = player?.phase;
  $: loading = $phase === "waitingFirstFrame" || $phase === "buffering";
  $: playing = $phase === "playing";
  $: className = [loading ? "loading" : "", playing ? "pause" : "play"].filter(Boolean).join(" ");

  let speed_panel: HTMLDivElement;

  function toggle() {
    if (!player) return;
    switch (player.player.phase) {
      case "waitingFirstFrame":
      case "pause":
      case "ended": {
        player.play();
        break;
      }
      case "playing": {
        player.pause();
        break;
      }
    }
  }

  function seek({ detail: seconds }: CustomEvent<number>) {
    if (!player) return;
    player.seek(seconds * 1000);
  }

  function setSpeed(speed: number) {
    if (!player) return;
    player.setSpeed(speed);
  }
</script>

<div class="{name} {theme}">
  <Button
    class={className}
    {name}
    {theme}
    {disabled}
    on:click={toggle}
    content={loading ? "" : playing ? t.pause : t.play}
  >
    {#if loading}
      <Icon src={icons?.loading[type]} alt="[loading]">
        <Icons.Loading {theme} />
      </Icon>
    {:else if playing}
      <Icon src={icons?.pause[type]} alt="[pause]">
        <Icons.Pause {theme} />
      </Icon>
    {:else}
      <Icon src={icons?.play[type]} alt="[play]">
        <Icons.Play {theme} />
      </Icon>
    {/if}
  </Button>
  {#if $current == null || $duration == null || $duration === 0}
    <Slider class="{name}-slider" disabled />
    <span class="{name}-progress loading">&hellip;/&hellip;</span>
  {:else}
    <Slider
      class="{name}-slider"
      {theme}
      value={$current / 1000}
      min={0}
      max={$duration / 1000}
      on:change={seek}
    />
    <span class="{name}-progress">
      <span class="{name}-current">{format($current)}</span>
      <span class="{name}-slash">/</span>
      <span class="{name}-duration">{format($duration)}</span>
    </span>
  {/if}
  <Button
    class="speed"
    {name}
    {theme}
    {disabled}
    content={t.speed}
    menu={speed_panel}
    menu_placement="top-end"
  >
    <span class="{name}-speed-text">{$speed || 1}x</span>
  </Button>
</div>

<div style="display:none">
  <div class="{name}-panel speed" bind:this={speed_panel}>
    {#each speeds as s (s)}
      <Button
        class="speed {s === $speed ? 'is-active' : ''}"
        {name}
        {theme}
        {disabled}
        on:click={() => setSpeed(s)}
      >
        {s}x
      </Button>
    {/each}
  </div>
</div>
