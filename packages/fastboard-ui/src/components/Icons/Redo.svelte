<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path fill="#5D6066" d="m14 5 6 4-6 4 2-4-2-4Z" class="fastboard-icon-fill-color" />
  <path
    fill="#5D6066"
    d="M8 8.375h8v1.25H8v-1.25Zm0 8h12v1.25H8v-1.25ZM3.375 13A4.625 4.625 0 0 1 8 8.375v1.25A3.375 3.375 0 0 0 4.625 13h-1.25Zm1.25 0A3.375 3.375 0 0 0 8 16.375v1.25A4.625 4.625 0 0 1 3.375 13h1.25Z"
    class="fastboard-icon-fill-color"
  />
</svg>
