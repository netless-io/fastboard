<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    fill="#5D6066"
    fill-rule="evenodd"
    d="M16.242 4.929a2 2 0 0 0-2.828 0L4.93 13.414a2 2 0 0 0 0 2.829l1.414 1.414a4 4 0 0 0 5.657 0l5.215-5.215-5.657-5.657.884-.884 5.657 5.657.972-.972a2 2 0 0 0 0-2.829l-2.83-2.827Z"
    clip-rule="evenodd"
    class="fastboard-icon-fill-color"
  />
</svg>
