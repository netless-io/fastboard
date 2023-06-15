<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path stroke="#5D6066" stroke-width="1.25" d="M4 4c16 0 0 16 16 16" class="fastboard-icon-stroke-color" />
</svg>
