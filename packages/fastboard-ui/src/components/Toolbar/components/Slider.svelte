<script lang="ts">
  import type { Theme } from "../../../typings";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ change: number }>();

  let className = "";
  export { className as class };
  export let theme: Theme = "light";
  export let min = 0;
  export let max = 100;
  export let step = 0.01;
  export let value = 30;
  export let disabled = false;

  const name = "fastboard-slider";

  let real_value = value;
  let grabbing = false;

  function on_down() {
    grabbing = true;
  }

  function on_change() {
    grabbing = false;
    value = real_value;
    dispatch("change", value);
  }

  $: if (value !== real_value && !grabbing) {
    real_value = value;
  }
  $: percent = (100 * (real_value - min)) / (max - min);
</script>

<div class="{name} {className} {theme}" style="--value:{percent}%">
  <input
    class="{name}-track {theme}"
    class:grabbing
    type="range"
    {disabled}
    {min}
    {max}
    {step}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    bind:value={real_value}
    on:pointerdown={on_down}
    on:change={on_change}
  />
</div>
