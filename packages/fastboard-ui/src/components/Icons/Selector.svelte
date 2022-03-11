<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    stroke="#5D6066"
    stroke-dasharray="1.25 1.25"
    stroke-linejoin="round"
    stroke-width="1.25"
    d="M18 11V4H4v14h7"
    class="fastboard-icon-stroke-color"
  />
  <path
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    d="m15 20-2-7 7 2-3.5 1.5L15 20Z"
    class="fastboard-icon-stroke-color"
  />
</svg>
