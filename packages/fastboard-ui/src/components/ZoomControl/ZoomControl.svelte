<script lang="ts" context="module">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { GenericIcon, I18nData, IconType, Language, Theme } from "../../typings";
  import { clamp } from "../helpers";

  const i18n: I18nData<"plus" | "minus" | "reset"> = {
    en: {
      plus: "Zoom In",
      minus: "Zoom Out",
      reset: "Reset",
    },
    "zh-CN": {
      plus: "放大",
      minus: "缩小",
      reset: "重置",
    },
  };

  const scales: readonly number[] = [
    0.3, 0.4096000000000002, 0.5120000000000001, 0.6400000000000001, 0.8, 1, 1.26, 1.5876000000000001,
    2.000376, 2.5204737600000002, 3,
  ];

  function next_scale(scale: number, delta: 1 | -1) {
    const { length } = scales;
    const last = length - 1;
    if (scale < scales[0]) return scales[0];
    if (scale > scales[last]) return scales[last];
    for (let i = 0; i < length; ++i) {
      const cur = scales[i];
      const prev = i === 0 ? -Infinity : (scales[i - 1] + cur) / 2;
      const next = i === last ? Infinity : (scales[i + 1] + cur) / 2;
      if (prev <= scale && scale <= next) return scales[clamp(i + delta, 0, last)];
    }
    return 1;
  }
</script>

<script lang="ts">
  import Icon from "../Icon";
  import Icons from "../Icons";
  import Button from "../Button";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let icons: GenericIcon<"plus" | "minus" | "reset"> | undefined = undefined;

  const name = "fastboard-zoom-control";

  $: writable = app?.writable;
  $: phase = app?.phase;
  $: disabled = !($writable && $phase === "connected");
  $: t = i18n[language];

  let type: IconType;
  $: type = disabled ? "disable" : "normal";

  $: camera = app?.camera;
  $: scale = $camera?.scale ?? 1;
  $: plus_disabled = disabled || next_scale(scale, 1) === scale;
  $: minus_disabled = disabled || next_scale(scale, -1) === scale;

  function plus() {
    app?.moveCamera({ scale: next_scale(scale, 1), centerX: 0, centerY: 0 });
  }

  function minus() {
    app?.moveCamera({ scale: next_scale(scale, -1), centerX: 0, centerY: 0 });
  }

  function reset() {
    app?.moveCamera({ scale: 1, centerX: 0, centerY: 0 });
  }
</script>

<div class="{name} {theme}">
  <Button class="plus" {name} {theme} disabled={plus_disabled} on:click={plus} content={t.plus}>
    <Icon src={icons?.plus[type]} alt="[plus]">
      <Icons.Plus {theme} />
    </Icon>
  </Button>
  <span class="{name}-text {theme}">
    {#if $camera == null}
      &hellip;
    {:else}
      {Math.ceil(scale * 100)}%
    {/if}
  </span>
  <Button class="minus" {name} {theme} disabled={minus_disabled} on:click={minus} content={t.minus}>
    <Icon src={icons?.minus[type]} alt="[minus]">
      <Icons.Minus {theme} />
    </Icon>
  </Button>
  <Button class="reset" {name} {theme} {disabled} on:click={reset} content={t.reset}>
    <Icon src={icons?.reset[type]} alt="[reset]">
      <Icons.Reset {theme} />
    </Icon>
  </Button>
</div>
