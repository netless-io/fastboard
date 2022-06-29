<script lang="ts">
  import type { Theme } from "../../typings";

  export let theme: Theme = "light";
  export let active = false;
</script>

<svg fill="none" viewBox="0 0 24 24" class="fastboard-icon {theme}" class:is-active={active}>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M16.2423 4.92893C15.4612 4.14788 14.1949 4.14788 13.4138 4.92893L4.92856 13.4142C4.14751 14.1953 4.14751 15.4616 4.92856 16.2426L6.34277 17.6568C7.90487 19.2189 10.4375 19.2189 11.9996 17.6568L17.2146 12.4419L11.5577 6.78508L12.4416 5.9012L18.0985 11.558L19.0707 10.5858C19.8517 9.80473 19.8517 8.5384 19.0707 7.75735L16.2423 4.92893ZM17.1161 18L15.5581 16.4419L16.4419 15.5581L18 17.1161L19.5581 15.5581L20.4419 16.4419L18.8839 18L20.4419 19.5581L19.5581 20.4419L18 18.8839L16.4419 20.4419L15.5581 19.5581L17.1161 18Z"
    fill="#3381FF"
    class="fastboard-icon-fill-color"
  />
</svg>
