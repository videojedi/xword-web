<script lang="ts">
  import { onMount } from 'svelte';
  import AppleIIScreen from './lib/components/AppleIIScreen.svelte';
  import CodeViewer from './lib/components/CodeViewer.svelte';
  import { getXwordProgram } from './lib/program/XwordProgram';

  let started = false;
  let showCode = false;

  function openCodeViewer(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    console.log('Button clicked, opening code viewer');
    showCode = true;
  }

  onMount(() => {
    // Start the XWORD program after a brief delay
    setTimeout(() => {
      started = true;
      const program = getXwordProgram();
      program.start();
    }, 500);
  });
</script>

<main>
  <div class="container">
    <AppleIIScreen />
    {#if !started}
      <div class="loading-overlay">
        <p>Click anywhere to start...</p>
      </div>
    {/if}
  </div>
  <footer>
    <p>xWord - Crossword Solving Aid</p>
    <p>By C.A.SMALL (1988)</p>
    <p class="hint">Press keys A-E to select menu options</p>
    <button class="code-btn" on:click={openCodeViewer} on:mousedown|stopPropagation>
      View Original BASIC Code
    </button>
  </footer>
</main>

{#if showCode}
  <CodeViewer on:close={() => showCode = false} />
{/if}

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
    padding: 20px;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  @media (max-width: 680px) {
    main {
      padding: 10px;
    }
  }

  .container {
    position: relative;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 25px;
    color: #33ff33;
    font-family: 'Courier New', monospace;
    font-size: 18px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  footer {
    margin-top: 20px;
    text-align: center;
    color: #666;
    font-family: 'Courier New', monospace;
    font-size: 12px;
  }

  footer p {
    margin: 5px 0;
  }

  .hint {
    color: #444;
  }

  .code-btn {
    margin-top: 15px;
    background: #1a3a1a;
    border: 2px solid #33ff33;
    color: #33ff33;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-block;
    z-index: 100;
    position: relative;
  }

  .code-btn:hover {
    background: rgba(51, 255, 51, 0.3);
    box-shadow: 0 0 15px rgba(51, 255, 51, 0.5);
  }

  .code-btn:active {
    background: rgba(51, 255, 51, 0.5);
  }
</style>
