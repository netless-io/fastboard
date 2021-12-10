<script lang="ts">
  import type { Theme } from "../types";
  import themes from "../theme";

  export let theme: Theme = "light";
  export let active = false;

  $: config = themes[theme];
  $: stroke = active ? config.activeColor : config.color;
</script>

<svg viewBox="0 0 24 24">
  <g stroke-width="1" fill="none" fill-rule="evenodd" {stroke}>
    <g id="切图" transform="translate(-88.000000, -152.000000)">
      <circle id="椭圆形备份-2" fill="#444E60" cx="100" cy="164" r="1" />
      <circle
        id="椭圆形"
        {stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
        cx="100"
        cy="164"
        r="4"
      />
      <line
        x1="100"
        y1="158"
        x2="100"
        y2="160"
        id="路径-2备份-2"
        {stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="100"
        y1="168"
        x2="100"
        y2="170"
        id="路径-2备份-2"
        {stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="106"
        y1="164"
        x2="104"
        y2="164"
        id="路径-2备份-2"
        {stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="96"
        y1="164"
        x2="94"
        y2="164"
        id="路径-2备份-2"
        {stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </g>
</svg>
