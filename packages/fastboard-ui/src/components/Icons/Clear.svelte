<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    d="M19.6567 4.34323L13.9999 10.0001"
    stroke="#5D6066"
    stroke-width="1.25"
    stroke-linejoin="round"
    class="fastboard-icon-stroke-color"
  />
  <path
    d="M8.34296 10.0001C9.90506 8.43799 12.4377 8.43799 13.9998 10.0001V10.0001C15.5619 11.5622 15.5619 14.0948 13.9998 15.6569V15.6569L8.34296 10.0001V10.0001Z"
    stroke="#5D6066"
    stroke-width="1.25"
    stroke-linejoin="round"
    class="fastboard-icon-stroke-color"
  />
  <path
    d="M8.34292 10.0001L13.9998 15.6569L11.5856 19.8996L4.10028 11.4143L8.34292 10.0001Z"
    stroke="#5D6066"
    stroke-width="1.25"
    stroke-linejoin="round"
    class="fastboard-icon-stroke-color"
  />
</svg>
