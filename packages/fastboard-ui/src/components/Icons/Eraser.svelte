<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    d="M16 16L20 20M20 16L16 20"
    stroke="#5D6066"
    class="fastboard-icon-stroke-color"
    stroke-width="1.25"
  />
  <path
    d="M13.4139 4.92898C14.195 4.14794 15.4613 4.14794 16.2423 4.92898L19.0708 7.75741C19.8518 8.53846 19.8518 9.80479 19.0708 10.5858L11.9997 17.6569C10.4376 19.219 7.90494 19.219 6.34284 17.6569L4.92863 16.2427C4.14758 15.4616 4.14758 14.1953 4.92863 13.4143L13.4139 4.92898Z"
    stroke="#5D6066"
    class="fastboard-icon-stroke-color"
    stroke-width="1.25"
    stroke-linejoin="round"
  />
  <path
    d="M12 6.34314L17.6569 12"
    stroke="#5D6066"
    class="fastboard-icon-stroke-color"
    stroke-width="1.25"
    stroke-linejoin="round"
  />
  <path
    d="M16.2422 4.92896L13.4138 7.75738"
    stroke="#5D6066"
    class="fastboard-icon-stroke-color"
    stroke-width="1.25"
    stroke-linejoin="round"
  />
  <path
    d="M17.6572 6.34314L14.8288 9.17157"
    stroke="#5D6066"
    class="fastboard-icon-stroke-color"
    stroke-width="1.25"
    stroke-linejoin="round"
  />
  <path
    d="M19.0713 7.75732L16.2429 10.5858"
    stroke="#5D6066"
    class="fastboard-icon-stroke-color"
    stroke-width="1.25"
    stroke-linejoin="round"
  />
</svg>
