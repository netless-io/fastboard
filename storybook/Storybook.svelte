<script lang="ts" context="module">
  import Toolbar from "../src/components/Toolbar.svelte";
  import Card from "./Card.svelte";
</script>

<Card title="Toolbar">
  <Toolbar position="left" />
  <Toolbar position="top" />
</Card>
<Card title="Hello world!" />
<Card title="Hello world!" />
<Card title="Hello world!" />
<Card title="Hello world!" />

<style>
  :global(body) {
    margin: 0;
    background-color: #eee;
  }
</style>
