<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.75"
    d="M19 7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2v3l2.414-2.414A2 2 0 0 1 12.828 16H17a2 2 0 0 0 2-2V7Z"
    class="fastboard-icon-stroke-color"
  />
</svg>
