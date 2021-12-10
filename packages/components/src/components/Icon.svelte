<script lang="ts">
  import type { Icon, IconType } from "../types";

  export const icon: Icon = { normal: "" };
  export const type: IconType = "normal";
  export let alt = "";

  const src = icon[type] || icon.normal;
</script>

<img {src} {alt} />
