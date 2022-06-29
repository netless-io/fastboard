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
    d="M13.414 4.929a2 2 0 0 1 2.829 0l2.828 2.828a2 2 0 0 1 0 2.829L12 17.656a4 4 0 0 1-5.657 0L4.93 16.244a2 2 0 0 1 0-2.829l8.485-8.485ZM12 6.343 17.657 12m-1.414-7.071-2.829 2.828m4.243-1.414-2.829 2.829m4.243-1.415-2.828 2.829"
    class="fastboard-icon-stroke-color"
  />
</svg>
