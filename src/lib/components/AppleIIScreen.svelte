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
    <div class="flicker"></div>
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
    background: linear-gradient(145deg, #c9c198, #b9b188);
    padding: 30px 40px;
    border-radius: 25px;
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.5),
      inset 0 2px 4px rgba(255, 255, 255, 0.3),
      inset 0 -2px 4px rgba(0, 0, 0, 0.2);
    transform-origin: top center;
  }

  /* Scale down for smaller screens */
  @media (max-width: 700px) {
    .crt-monitor {
      transform: scale(0.85);
    }
  }

  @media (max-width: 500px) {
    .crt-monitor {
      transform: scale(0.65);
      margin-bottom: -15%;
    }
  }

  @media (max-width: 400px) {
    .crt-monitor {
      transform: scale(0.52);
      margin-bottom: -25%;
    }
  }

  .crt-screen {
    position: relative;
    background: #050505;
    border-radius: 20px;
    overflow: hidden;
    box-shadow:
      inset 0 0 80px rgba(0, 40, 0, 0.4),
      inset 0 0 20px rgba(0, 0, 0, 0.8),
      0 0 15px rgba(0, 255, 0, 0.05);
    /* Subtle fisheye effect */
    transform: perspective(800px) rotateX(2deg);
    transform-style: preserve-3d;
  }

  /* Curved glass overlay */
  .crt-screen::before {
    content: '';
    position: absolute;
    top: -2%;
    left: -2%;
    right: -2%;
    bottom: -2%;
    background: radial-gradient(
      ellipse 120% 120% at 50% 50%,
      transparent 0%,
      transparent 70%,
      rgba(0, 0, 0, 0.3) 85%,
      rgba(0, 0, 0, 0.6) 100%
    );
    border-radius: 50% / 10%;
    pointer-events: none;
    z-index: 20;
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
    background:
      /* Glass reflection highlight */
      radial-gradient(
        ellipse 80% 40% at 30% 15%,
        rgba(255, 255, 255, 0.08) 0%,
        transparent 50%
      ),
      /* Corner darkening for curved effect */
      radial-gradient(
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

  /* CRT flicker overlay */
  .flicker {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0);
    pointer-events: none;
    z-index: 25;
    animation: flicker 8s infinite;
  }

  @keyframes flicker {
    0%, 100% {
      opacity: 0;
    }
    /* Quick flicker at ~3 seconds */
    37% {
      opacity: 0;
    }
    37.5% {
      opacity: 0.03;
      background: rgba(255, 255, 255, 0.03);
    }
    38% {
      opacity: 0;
    }
    38.3% {
      opacity: 0.02;
    }
    38.6% {
      opacity: 0;
    }
    /* Slight dim around 5.5 seconds */
    68% {
      opacity: 0;
    }
    69% {
      opacity: 0.015;
      background: rgba(0, 0, 0, 0.08);
    }
    70% {
      opacity: 0;
    }
    /* Double flicker near end */
    92% {
      opacity: 0;
    }
    92.2% {
      opacity: 0.04;
      background: rgba(255, 255, 255, 0.04);
    }
    92.5% {
      opacity: 0;
    }
    93% {
      opacity: 0.025;
      background: rgba(255, 255, 255, 0.025);
    }
    93.3% {
      opacity: 0;
    }
  }
</style>
