<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path fill="#5D6066" d="M10 18 6 6l12 4-6 2-2 6Z" class="fastboard-icon-fill-color" />
</svg>
