<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <rect
    x="5"
    y="5"
    width="6"
    height="6"
    stroke="#5D6066"
    stroke-width="1.25"
    stroke-linejoin="round"
    class="fastboard-icon-stroke-color"
  />
  <rect
    x="13"
    y="5"
    width="6"
    height="6"
    stroke="#5D6066"
    stroke-width="1.25"
    stroke-linejoin="round"
    class="fastboard-icon-stroke-color"
  />
  <rect
    x="5"
    y="13"
    width="6"
    height="6"
    stroke="#5D6066"
    stroke-width="1.25"
    stroke-linejoin="round"
    class="fastboard-icon-stroke-color"
  />
  <rect
    x="13"
    y="13"
    width="6"
    height="6"
    stroke="#5D6066"
    stroke-width="1.25"
    stroke-linejoin="round"
    class="fastboard-icon-stroke-color"
  />
</svg>
