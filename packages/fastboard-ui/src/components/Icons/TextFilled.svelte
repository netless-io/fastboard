<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path fill="#3381FF" stroke="#5D6066" d="M11.5 5.5h1v13h-1z" class="fastboard-icon-stroke-color" />
  <path
    stroke="#5D6066"
    stroke-linejoin="round"
    stroke-width="1.25"
    d="M6 7V5h5m7 2V5h-5M8 19h3m5 0h-3m-2 0V5m0 14h2M11 5h2m0 0v14"
    class="fastboard-icon-stroke-color"
  />
</svg>
