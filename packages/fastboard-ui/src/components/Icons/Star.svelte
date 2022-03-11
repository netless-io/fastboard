<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    d="m12 4 1.88 5.411 5.728.117-4.565 3.46 1.66 5.484L12 15.2l-4.702 3.272 1.659-5.483-4.565-3.461 5.727-.117L12 4Z"
    class="fastboard-icon-stroke-color"
  />
</svg>
