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
    d="M15.536 4.222a2 2 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.828l-9.9 9.9-4.95.707.708-4.95 9.9-9.9Z"
    class="fastboard-icon-stroke-color"
  />
  <path
    stroke="#5D6066"
    stroke-width="1.25"
    d="m14.121 5.636 4.243 4.243"
    class="fastboard-icon-stroke-color"
  />
  <path
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    d="m16.243 7.757-5.657 5.657m-3.536.707v1.415h1.415v1.414h1.414"
    class="fastboard-icon-stroke-color"
  />
</svg>
