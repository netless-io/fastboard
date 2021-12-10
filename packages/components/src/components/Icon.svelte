<script lang="ts">
  import type { Icon, IconType } from "../types";

  export const icon: Icon = { normal: "" };
  export const type: IconType = "normal";

  const src = icon[type] || icon.normal;
  export const alt = "";
</script>

<img {src} {alt} />
