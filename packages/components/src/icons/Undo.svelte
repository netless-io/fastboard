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
    <path d="m11 14-2-2-2-2 2-2 2-2" />
    <path d="M7 10h8a2 2 0 0 1 2 2v6h0" />
  </g>
</svg>
