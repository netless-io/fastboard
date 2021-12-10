<script lang="ts">
  import type { Theme } from "../types";
  import themes from "../theme";

  export let theme: Theme = "light";
  export let active = false;

  $: config = themes[theme];
  $: stroke = active ? config.activeColor : config.color;
</script>

<svg viewBox="0 0 24 24">
  <g
    fill="none"
    fill-rule="evenodd"
    {stroke}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m13 14 2-2 2-2-2-2-2-2" />
    <path d="M17 10H9a2 2 0 0 0-2 2v6h0" />
  </g>
</svg>
