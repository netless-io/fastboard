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
    fill={stroke}
    d="M12 7.5a.5.5 0 0 1 .09.992L12 8.5H8a1.5 1.5 0 0 0-1.493 1.356L6.5 10v6a1.5 1.5 0 0 0 1.356 1.493L8 17.5h6a1.5 1.5 0 0 0 1.493-1.356L15.5 16v-4a.5.5 0 0 1 .992-.09l.008.09v4a2.5 2.5 0 0 1-2.336 2.495L14 18.5H8a2.5 2.5 0 0 1-2.495-2.336L5.5 16v-6a2.5 2.5 0 0 1 2.336-2.495L8 7.5h4Zm4-2a.5.5 0 0 1 .492.41L16.5 6v1.5H18a.5.5 0 0 1 .09.992L18 8.5h-1.5V10a.5.5 0 0 1-.992.09L15.5 10V8.5H14a.5.5 0 0 1-.09-.992L14 7.5h1.5V6a.5.5 0 0 1 .5-.5Z"
  />
</svg>
