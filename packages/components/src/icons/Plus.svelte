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
    stroke-width="1"
    fill="none"
    fill-rule="evenodd"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g id="切图" transform="translate(-88.000000, -224.000000)" {stroke}>
      <line x1="100" y1="231" x2="100" y2="241" id="路径-2" />
      <line x1="95" y1="236" x2="105" y2="236" id="路径-2" />
    </g>
  </g>
</svg>
