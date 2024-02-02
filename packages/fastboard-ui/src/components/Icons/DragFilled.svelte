<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    d="M17.143 8.143v2.571h-3.857V6.857h2.571L12 3 8.143 6.857h2.571v3.857H6.857V8.143L3 12l1.286 1.286 2.571 2.571v-2.571h3.857v3.857H8.143L12 21l1.286-1.286 2.571-2.571h-2.571v-3.857h3.857v2.571L21 12l-3.857-3.857Z"
    fill="#5D6066"
    class="fastboard-icon-fill-color"
  />
</svg>
