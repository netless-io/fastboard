<script lang="ts" context="module">
  import type { FastboardApp } from "@netless/fastboard-core";
  import type { GenericIcon, I18nData, IconType, Language, Theme } from "../../typings";
  const i18n: I18nData<"redo" | "undo"> = {
    en: {
      redo: "Redo",
      undo: "Undo",
    },
    "zh-CN": {
      redo: "重做",
      undo: "撤销",
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
  export let icons: GenericIcon<"undo" | "redo"> | undefined = undefined;

  const name = "fastboard-redo-undo";

  $: writable = app?.writable;
  $: disabled = !$writable;
  $: t = i18n[language];

  let type: IconType;
  $: type = disabled ? "disable" : "normal";

  $: undoSteps = app?.canUndoSteps;
  $: redoSteps = app?.canRedoSteps;
  $: undo_disabled = disabled || !$undoSteps;
  $: redo_disabled = disabled || !$redoSteps;

  function undo() {
    app?.undo();
  }

  function redo() {
    app?.redo();
  }
</script>

<div class="{name} {theme}">
  <Button class="undo" {name} {theme} disabled={undo_disabled} on:click={undo} content={t.undo}>
    <Icon src={icons?.undo[type]} alt="[undo]">
      <Icons.Undo {theme} />
    </Icon>
  </Button>
  <Button class="redo" {name} {theme} disabled={redo_disabled} on:click={redo} content={t.redo}>
    <Icon src={icons?.redo[type]} alt="[redo]">
      <Icons.Redo {theme} />
    </Icon>
  </Button>
</div>
