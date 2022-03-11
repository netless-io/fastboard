<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    d="M4 20h16M4 6h16"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    class="fastboard-icon-stroke-color"
  />
  <rect
    height="10"
    rx="1"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    width="14"
    x="5"
    y="8"
    class="fastboard-icon-stroke-color"
  />
  <path
    d="M12 4v2m-3 7h6m-3-3v6"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    class="fastboard-icon-stroke-color"
  />
</svg>
