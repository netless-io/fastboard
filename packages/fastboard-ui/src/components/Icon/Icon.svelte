<script lang="ts">
  export let src = "";
  export let alt = "";
  export let title = "";
</script>

{#if src}
  <img {src} {alt} title={title || alt} />
{:else}
  <slot />
{/if}
