<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    d="M5 19 15.5 8.5M17 12l2-7-7 2 3.5 1.5L17 12Z"
    class="fastboard-icon-stroke-color"
  />
</svg>
