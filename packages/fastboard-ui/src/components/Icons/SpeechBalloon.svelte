<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    d="M17 4.5c.414 0 .79.168 1.06.44.272.27.44.646.44 1.06v9c0 .414-.168.79-.44 1.06a1.49 1.49 0 0 1-1.06.44h-4.207l-2.715 2.715-1.81-2.715H7a1.49 1.49 0 0 1-1.06-.44A1.495 1.495 0 0 1 5.5 15V6c0-.414.168-.79.44-1.06A1.49 1.49 0 0 1 7 4.5Z"
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    class="fastboard-icon-stroke-color"
  />
</svg>
