<script lang="ts">
  export let intensity: number = 0.25;
</script>

<div
  class="scanlines"
  style="--scanline-opacity: {intensity};"
></div>

<style>
  .scanlines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, var(--scanline-opacity, 0.25)) 0px,
      rgba(0, 0, 0, var(--scanline-opacity, 0.25)) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 10;
  }
</style>
