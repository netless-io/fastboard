<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path fill="#5D6066" d="M14 19h4V5h-4M6 19h4V5H6v14z" class="fastboard-icon-fill-color" />
</svg>
