<script lang="ts">
  import { onMount } from 'svelte';
  import AppleIIScreen from './lib/components/AppleIIScreen.svelte';
  import CodeViewer from './lib/components/CodeViewer.svelte';
  import { getXwordProgram } from './lib/program/XwordProgram';

  let started = false;
  let showCode = false;
  let isMobile = false;

  function openCodeViewer(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    console.log('Button clicked, opening code viewer');
    showCode = true;
  }

  function simulateKeyPress(key: string) {
    const event = new KeyboardEvent('keydown', {
      key: key,
      code: `Key${key.toUpperCase()}`,
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  function simulateEnter() {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  onMount(() => {
    // Check if mobile
    isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

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
  {#if isMobile}
    <div class="mobile-keyboard">
      <div class="key-row">
        <button class="key" on:click={() => simulateKeyPress('1')}>1</button>
        <button class="key" on:click={() => simulateKeyPress('2')}>2</button>
        <button class="key" on:click={() => simulateKeyPress('3')}>3</button>
        <button class="key" on:click={() => simulateKeyPress('4')}>4</button>
        <button class="key" on:click={() => simulateKeyPress('5')}>5</button>
        <button class="key" on:click={() => simulateKeyPress('6')}>6</button>
        <button class="key" on:click={() => simulateKeyPress('7')}>7</button>
        <button class="key" on:click={() => simulateKeyPress('8')}>8</button>
        <button class="key" on:click={() => simulateKeyPress('9')}>9</button>
        <button class="key" on:click={() => simulateKeyPress('0')}>0</button>
      </div>
      <div class="key-row">
        <button class="key" on:click={() => simulateKeyPress('q')}>Q</button>
        <button class="key" on:click={() => simulateKeyPress('w')}>W</button>
        <button class="key" on:click={() => simulateKeyPress('e')}>E</button>
        <button class="key" on:click={() => simulateKeyPress('r')}>R</button>
        <button class="key" on:click={() => simulateKeyPress('t')}>T</button>
        <button class="key" on:click={() => simulateKeyPress('y')}>Y</button>
        <button class="key" on:click={() => simulateKeyPress('u')}>U</button>
        <button class="key" on:click={() => simulateKeyPress('i')}>I</button>
        <button class="key" on:click={() => simulateKeyPress('o')}>O</button>
        <button class="key" on:click={() => simulateKeyPress('p')}>P</button>
      </div>
      <div class="key-row">
        <button class="key" on:click={() => simulateKeyPress('a')}>A</button>
        <button class="key" on:click={() => simulateKeyPress('s')}>S</button>
        <button class="key" on:click={() => simulateKeyPress('d')}>D</button>
        <button class="key" on:click={() => simulateKeyPress('f')}>F</button>
        <button class="key" on:click={() => simulateKeyPress('g')}>G</button>
        <button class="key" on:click={() => simulateKeyPress('h')}>H</button>
        <button class="key" on:click={() => simulateKeyPress('j')}>J</button>
        <button class="key" on:click={() => simulateKeyPress('k')}>K</button>
        <button class="key" on:click={() => simulateKeyPress('l')}>L</button>
      </div>
      <div class="key-row">
        <button class="key" on:click={() => simulateKeyPress('z')}>Z</button>
        <button class="key" on:click={() => simulateKeyPress('x')}>X</button>
        <button class="key" on:click={() => simulateKeyPress('c')}>C</button>
        <button class="key" on:click={() => simulateKeyPress('v')}>V</button>
        <button class="key" on:click={() => simulateKeyPress('b')}>B</button>
        <button class="key" on:click={() => simulateKeyPress('n')}>N</button>
        <button class="key" on:click={() => simulateKeyPress('m')}>M</button>
        <button class="key wide" on:click={simulateEnter}>⏎</button>
      </div>
      <div class="key-row">
        <button class="key spacebar" on:click={() => simulateKeyPress(' ')}>SPACE</button>
      </div>
    </div>
  {/if}
  <footer>
    <p>xWord - Crossword Solving Aid</p>
    <p>By C.A.SMALL (1988)</p>
    <p class="hint">{isMobile ? 'Tap keys above to navigate' : 'Press keys A-E to select menu options'}</p>
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

  /* Mobile keyboard */
  .mobile-keyboard {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100%;
    max-width: 360px;
  }

  .key-row {
    display: flex;
    gap: 4px;
    justify-content: center;
    width: 100%;
  }

  .key {
    flex: 1;
    max-width: 34px;
    height: 42px;
    background: #1a3a1a;
    border: 2px solid #33ff33;
    color: #33ff33;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    padding: 0;
  }

  .key:active {
    background: rgba(51, 255, 51, 0.4);
    transform: scale(0.95);
  }

  .key.wide {
    flex: 1.5;
    max-width: 52px;
    font-size: 18px;
  }

  .key.spacebar {
    flex: 1;
    max-width: 200px;
    font-size: 12px;
    letter-spacing: 2px;
  }
</style>
