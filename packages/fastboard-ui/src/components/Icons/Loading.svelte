<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path fill="#5D6066" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z" class="fastboard-icon-fill-color" />
</svg>
