<script lang="ts" context="module">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { GenericIcon, I18nData, IconType, Language, Theme } from "../../typings";
  const i18n: I18nData<"prev" | "next" | "add"> = {
    en: {
      prev: "Prev Page",
      next: "Next Page",
      add: "Add Page",
    },
    "zh-CN": {
      prev: "上一页",
      next: "下一页",
      add: "添加页面",
    },
  };
</script>

<script lang="ts">
  import Icon from "../Icon";
  import Icons from "../Icons";
  import Button from "../Button";

  export let app: FastboardApp | null | undefined = null;
  export let theme: Theme = "light";
  export let language: Language = "en";
  export let icons: GenericIcon<"prev" | "next" | "add"> | undefined = undefined;

  const name = "fastboard-page-control";

  $: writable = app?.writable;
  $: disabled = !$writable;
  $: t = i18n[language];

  let type: IconType;
  $: type = disabled ? "disable" : "normal";

  $: index = app?.sceneIndex;
  $: length = app?.sceneLength;
  $: prev_disabled = disabled || !$index;
  $: next_disabled = disabled || $length == null || $index === $length - 1;

  function prevPage() {
    app?.prevPage();
  }

  function nextPage() {
    app?.nextPage();
  }

  function addPage() {
    app?.addPage({ after: true });
  }
</script>

<div class="{name} {theme}">
  <Button class="prev" {name} {theme} disabled={prev_disabled} on:click={prevPage} content={t.prev}>
    <Icon src={icons?.prev[type]} alt="[prev]">
      <Icons.Left {theme} />
    </Icon>
  </Button>
  <span class="{name}-text {theme}">
    {#if $index == null || $length == null}
      &hellip;
    {:else}
      {$index + 1}/{$length}
    {/if}
  </span>
  <Button class="next" {name} {theme} disabled={next_disabled} on:click={nextPage} content={t.next}>
    <Icon src={icons?.next[type]} alt="[next]">
      <Icons.Right {theme} />
    </Icon>
  </Button>
  <Button class="add" {name} {theme} {disabled} on:click={addPage} content={t.add}>
    <Icon src={icons?.add[type]} alt="[add]">
      <Icons.WhiteboardAdd {theme} />
    </Icon>
  </Button>
</div>
