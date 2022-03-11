<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    class="fastboard-icon-stroke-color"
    d="m16 10-2 2-2 2-2-2-2-2"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
  />
</svg>
