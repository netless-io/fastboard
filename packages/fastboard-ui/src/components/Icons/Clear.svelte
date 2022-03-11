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
    d="m17.95 4.636-2.83 2.828-1.413-1.414a2 2 0 0 0-2.829 0l-.707.707 7.071 7.071.707-.707a2 2 0 0 0 0-2.828l-1.414-1.414 2.829-2.829-1.415-1.414Zm-1.415 9.9-5.656 5.656-.707-.707 1.767-3.182-3.182 1.768.707-2.121-2.121.707 1.768-3.182-3.182 1.768.707-2.122-2.121.707-.707-.707 5.656-5.657"
    class="fastboard-icon-stroke-color"
  />
</svg>
