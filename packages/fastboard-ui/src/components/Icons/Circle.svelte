<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <rect
    width="16"
    height="16"
    x="4"
    y="4"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    rx="8"
    class="fastboard-icon-stroke-color"
  />
</svg>
