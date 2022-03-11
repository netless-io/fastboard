<script lang="ts">
  import type { FastboardApp, FastboardPlayer } from "@netless/fastboard-core";
  import type { Language, Theme } from "../src";
  import type { MockApp } from "./mock-app";
  import { onMount } from "svelte";
  import { is_client } from "svelte/internal";

  import { tippy, tippy_menu } from "../src/actions/tippy";
  import { Fastboard } from "../src";
  import { mockApp } from "./mock-app";
  import { mockPlayer } from "./mock-player";
  import { resizable } from "./resizable";

  import PlayerControl from "../src/components/PlayerControl";
  import Slider from "../src/components/Toolbar/components/Slider.svelte";

  let app: FastboardApp | undefined;
  let player: FastboardPlayer | undefined;
  let mock: MockApp | undefined;
  let theme: Theme = is_client
    ? matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : "dark";
  let language: Language = is_client ? (navigator.language.startsWith("zh") ? "zh-CN" : "en") : "en";

  let tippy_content: HTMLDivElement;
  let tippy_content_text = "hello, world!";

  function create_app() {
    if (!app) [app, mock] = mockApp();
    if (!player) [player] = mockPlayer();
  }

  function toggle_theme(ev: { currentTarget: HTMLInputElement }) {
    theme = ev.currentTarget.checked ? "dark" : "light";
  }

  function toggle_language(ev: { currentTarget: HTMLInputElement }) {
    language = ev.currentTarget.dataset.language as Language;
  }

  $: if (is_client) {
    document.body.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }

  $: mock_redo_undo = mock?.redo_undo;
  $: writable = app?.writable;
  $: member_state = app?.memberState;

  onMount(() => {
    create_app();
    mock.commit();
  });
</script>

<div class="flex">
  <div class="container" use:resizable={{ defaultSize: { width: 480, height: 300 } }}>
    <Fastboard {app} {theme} {language} />
  </div>

  <div class="temp" style="width: 144px; height: 48px">
    <samp>[RedoUndo]</samp>
    <button on:click={mock?.commit}>commit</button>
    <code>{JSON.stringify($mock_redo_undo)}</code>
  </div>

  <div class="temp" style="width: 144px; height: 48px">
    <samp>[Slider] {$member_state?.strokeWidth}</samp>
    <Slider
      min={1}
      max={32}
      step={1}
      value={$member_state?.strokeWidth}
      on:change={ev => app?.setStrokeWidth(ev.detail)}
    />
  </div>

  <div class="temp" style="width: 144px; height: 48px">
    <samp>[tippy]</samp>
    <button use:tippy={{ content: "hello, world!" }}>Simple</button>
    <span use:tippy={{ content: "click me!" }}>
      <button
        use:tippy={{
          content: tippy_content,
          ...tippy_menu,
          placement: "bottom",
          appendTo: document.body, // so that it breaks overflow-hidden
        }}
      >
        Menu
      </button>
    </span>
  </div>

  <div class="temp" style="width: 300px; height: 48px">
    <samp>[player&nbsp;control]</samp>
    <PlayerControl {player} {theme} {language} />
  </div>
</div>

<div class="flex actions">
  <div class="row">
    <button on:click={create_app} disabled={app !== undefined}>createApp</button>
    <input type="checkbox" id="writable" bind:checked={$writable} />
    <label for="writable"><em>Writable</em></label>
    <input type="checkbox" id="theme" checked={theme === "dark"} on:change={toggle_theme} />
    <label for="theme"><em>Dark</em></label>
    <!-- prettier-ignore -->
    <input type="radio" id="lang-en" data-language="en" name="language"
           checked={language === "en"} on:change={toggle_language} />
    <label for="lang-en"><em>English</em></label>
    <!-- prettier-ignore -->
    <input type="radio" id="lang-zh-CN" data-language="zh-CN" name="language"
           checked={language === "zh-CN"} on:change={toggle_language} />
    <label for="lang-zh-CN"><em>简体中文</em></label>
  </div>
</div>

<div style="display: none;">
  <!-- note: tippy_content will be moved to anywhere! -->
  <!-- put it in display:none so that it won't trigger page re-draw -->
  <div bind:this={tippy_content}>
    <input bind:value={tippy_content_text} />
    <p>Menu <b>Content</b> <em>Rich Text</em>: <samp>{tippy_content_text}</samp></p>
    <!-- note: [data-tippy-root] elements have ._tippy which is the instance -->
    <button on:click={() => tippy_content.parentElement.parentElement.parentElement["_tippy"].hide()}>
      Close Me
    </button>
  </div>
</div>

<style>
  :global(html, body, #app) {
    width: 100%;
    height: 100%;
  }
  :global(body) {
    margin: 0;
  }
  button:not(:disabled),
  label {
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }
  input[type="radio"] {
    margin: 3px 3px 3px 4px;
  }
  samp {
    font-size: 0.8em;
    font-family: "Cascadia Mono", monospace;
  }
  .flex {
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
    gap: 10px;
  }
  .container {
    background-image: repeating-linear-gradient(-45deg, transparent, transparent 10px, grey 10px, grey 20px);
  }
  .container,
  .temp {
    box-sizing: content-box;
    border: 1px solid grey;
    border-radius: 5px;
    overflow: hidden;
  }
  .container {
    display: flex;
    position: relative;
  }
  .temp {
    position: relative;
    display: inline-block;
  }
  .temp {
    padding: 10px;
    padding-top: calc(10px + 1.2em);
  }
  .temp samp {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.5em;
  }
  .actions {
    padding: 10px;
    position: sticky;
    font-size: 14px;
    top: 100%;
    flex-direction: column;
  }
  .row {
    box-sizing: content-box;
    border: 1px solid grey;
    border-radius: 5px;
    overflow: hidden;
    line-height: 1.75;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
  }
</style>
