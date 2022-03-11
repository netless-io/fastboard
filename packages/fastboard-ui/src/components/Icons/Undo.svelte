<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path fill="#5D6066" d="M10 5 4 9l6 4-2-4 2-4Z" class="fastboard-icon-fill-color" />
  <path
    fill="#5D6066"
    d="M16 8.375H8v1.25h8v-1.25Zm0 8H4v1.25h12v-1.25ZM20.625 13A4.625 4.625 0 0 0 16 8.375v1.25A3.375 3.375 0 0 1 19.375 13h1.25Zm-1.25 0A3.375 3.375 0 0 1 16 16.375v1.25A4.625 4.625 0 0 0 20.625 13h-1.25Z"
    class="fastboard-icon-fill-color"
  />
</svg>
