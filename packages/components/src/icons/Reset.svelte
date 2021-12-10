<script lang="ts">
  import type { Theme } from "../types";
  import themes from "../theme";

  export let theme: Theme = "light";
  export let active = false;

  $: config = themes[theme];
  $: stroke = active ? config.activeColor : config.color;
</script>

<svg viewBox="0 0 24 24">
  <g fill="none" fill-rule="evenodd" {stroke} transform="translate(-88 -152)">
    <circle cx="100" cy="164" r="1" fill={stroke} />
    <circle
      cx="100"
      cy="164"
      r="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M100 158v2m0 8v2m6-6h-2m-8 0h-2"
    />
  </g>
</svg>
