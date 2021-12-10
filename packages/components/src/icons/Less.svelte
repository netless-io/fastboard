<script lang="ts">
  import type { Theme } from "../types";
  import themes from "../theme";

  export let theme: Theme = "light";
  export let active = false;

  $: config = themes[theme];
  $: stroke = active ? config.activeColor : config.color;
</script>

<svg viewBox="0 0 24 24">
  <path
    fill="none"
    {stroke}
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M7 12h10"
  />
</svg>
