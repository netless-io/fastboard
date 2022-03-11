<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <circle cx="12" cy="12" fill="#5D6066" r="2" class="fastboard-icon-fill-color" />
  <path
    d="M12 3v4m0 10v4m9-9h-4M7 12H3"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    class="fastboard-icon-stroke-color"
  />
  <circle
    cx="12"
    cy="12"
    r="7"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    class="fastboard-icon-stroke-color"
  />
</svg>
