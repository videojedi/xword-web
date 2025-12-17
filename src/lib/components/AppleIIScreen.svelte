<script lang="ts">
  import { screenStore } from '../stores/screenStore';
  import Cursor from './Cursor.svelte';
  import ScanlineOverlay from './ScanlineOverlay.svelte';
  import '../styles/crt.css';

  $: buffer = $screenStore.buffer;
  $: cursorX = $screenStore.cursorX;
  $: cursorY = $screenStore.cursorY;
  $: cursorVisible = $screenStore.cursorVisible;
</script>

<div class="crt-monitor">
  <div class="crt-screen">
    <div class="screen-content">
      {#each buffer as row, y}
        <div class="screen-row">
          {#each row as char, x}
            {#if y === cursorY && x === cursorX && cursorVisible}
              <Cursor visible={true} />
            {:else}
              <span class="char">{char}</span>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
    <ScanlineOverlay intensity={0.2} />
    <div class="vignette"></div>
  </div>
</div>

<style>
  .crt-monitor {
    position: relative;
    background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
    padding: 30px 40px;
    border-radius: 25px;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.8),
      inset 0 2px 4px rgba(255, 255, 255, 0.05),
      inset 0 -2px 4px rgba(0, 0, 0, 0.5);
  }

  .crt-screen {
    position: relative;
    background: #050505;
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
      inset 0 0 80px rgba(0, 40, 0, 0.4),
      inset 0 0 20px rgba(0, 0, 0, 0.8),
      0 0 15px rgba(0, 255, 0, 0.05);
  }

  .screen-content {
    padding: 15px 20px 35px 20px;
    font-family: 'Courier New', 'Lucida Console', monospace;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 20px;
  }

  .screen-row {
    display: flex;
    height: 20px;
    white-space: pre;
  }

  .char {
    display: inline-block;
    width: 14px;
    height: 20px;
    text-align: center;
    color: #33ff33;
    text-shadow:
      0 0 3px rgba(51, 255, 51, 0.5),
      0 0 6px rgba(51, 255, 51, 0.3),
      0 0 12px rgba(0, 255, 0, 0.15);
  }

  .vignette {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 60%,
      rgba(0, 0, 0, 0.25) 100%
    );
    pointer-events: none;
    z-index: 5;
  }

  /* Screen curvature effect */
  .crt-screen::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 3%,
      transparent 97%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
    z-index: 15;
  }
</style>
