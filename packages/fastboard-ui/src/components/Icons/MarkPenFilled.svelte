<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <g
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    transform="scale(0.85 0.9) translate(2, 0)"
  >
    <path
      class="fastboard-icon-fill-color"
      d="m15.95 2.39l5.657 5.657a1 1 0 0 1 0 1.414l-7.778 7.778l-2.122.707l-1.414 1.415a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414L6.05 12.29l.707-2.122l7.779-7.778a1 1 0 0 1 1.414 0m.707 3.536l-6.364 6.364l1.414 1.414l6.364-6.364zM4.283 16.886l2.828 2.828l-1.414 1.415l-4.243-1.415z"
    />
  </g>
</svg>
