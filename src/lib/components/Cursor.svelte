<script lang="ts">
  export let visible: boolean = true;
</script>

{#if visible}
  <span class="cursor">&#9608;</span>
{:else}
  <span class="cursor-hidden">&nbsp;</span>
{/if}

<style>
  .cursor {
    color: var(--phosphor-bright, #33ff33);
    animation: blink 0.5s step-end infinite;
    text-shadow:
      0 0 2px rgba(51, 255, 51, 0.4),
      0 0 5px rgba(51, 255, 51, 0.4);
  }

  .cursor-hidden {
    visibility: hidden;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
</style>
