<script lang="ts">
  import type { Content, Placement } from "tippy.js";
  import type { Theme } from "../../typings";
  import { tippy, tippy_menu } from "../../actions/tippy";

  let className = "";
  export { className as class };
  export let name = "fastboard-ui";
  export let theme: Theme = "light";
  export let disabled = false;
  export let content: Content = "";
  export let placement: Placement = "top";
  export let menu: Content = "";
  export let menu_placement: Placement = "right-start";
</script>

{#if content}
  {#if menu}
    <span class="{name}-btn-interactive {theme}" use:tippy={{ content, placement, className }}>
      <button
        class="{name}-btn {className} {theme}"
        {disabled}
        on:click
        use:tippy={{
          content: menu,
          ...tippy_menu,
          placement: menu_placement,
          appendTo: document.body,
          theme,
          className: "fastboard-panel",
        }}
      >
        <slot />
      </button>
      <span class="{name}-triangle" />
    </span>
  {:else}
    <button
      class="{name}-btn {className} {theme}"
      {disabled}
      on:click
      use:tippy={{ content, placement, className }}
    >
      <slot />
    </button>
  {/if}
{:else}
  <button class="{name}-btn {className} {theme}" {disabled} on:click>
    <slot />
  </button>
{/if}
