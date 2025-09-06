<script setup lang="ts">
import { ref, onMounted } from "vue";
import Hero from "@/components/Hero.vue";

// Define Bubble type
interface Bubble {
  id: number;
  baseTop: number;
  baseLeft: number;
  top: number;
  left: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
  merged: boolean;
}

const bubbles = ref<Bubble[]>([]);
const audioRef = ref<HTMLAudioElement | null>(null);
const presenceCount = ref(0);

function getRandomColor(): string {
  // Dimmer, semi-transparent versions of your colors
  const colors = [
    'rgba(0, 255, 204, 0.4)',
    'rgba(0, 255, 153, 0.4)',
    'rgba(51, 204, 255, 0.4)',
    'rgba(51, 153, 255, 0.4)',
    'rgba(102, 204, 255, 0.4)',
    'rgba(0, 204, 255, 0.4)',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateBubble(id: number): Bubble {
  const size = Math.floor(Math.random() * 100) + 80;
  const baseTop = Math.random() * 80 + 10;
  const baseLeft = Math.random() * 80 + 10;

  return {
    id,
    baseTop,
    baseLeft,
    top: baseTop,
    left: baseLeft,
    size,
    color: getRandomColor(),
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    merged: false,
  };
}

function updateBubbles() {
  for (const b of bubbles.value) {
    // floating effect (very tiny)
    b.top = b.baseTop + Math.sin(Date.now() / 2000 + b.id) * 0.5;
    b.left = b.baseLeft + Math.cos(Date.now() / 2000 + b.id) * 0.5;

    // slower movement
    b.baseTop += b.dy * 0.1;
    b.baseLeft += b.dx * 0.1;

    if (b.baseTop < 5 || b.baseTop > 95) b.dy = -b.dy;
    if (b.baseLeft < 5 || b.baseLeft > 95) b.dx = -b.dx;

    b.merged = false; // reset merge state
  }

  for (let i = 0; i < bubbles.value.length; i++) {
    for (let j = i + 1; j < bubbles.value.length; j++) {
      const a = bubbles.value[i];
      const b = bubbles.value[j];
      const dist = Math.hypot(a.left - b.left, a.top - b.top);

      if (dist < (a.size + b.size) / 100) { // smaller threshold
        a.merged = true;
        b.merged = true;

        // blend colors
        const parse = (c: string) =>
          c.replace(/[rgba()]/g, '').split(',').map(n => parseFloat(n.trim()));
        const [r1,g1,b1,a1] = parse(a.color);
        const [r2,g2,b2,a2] = parse(b.color);
        const r = Math.floor((r1+r2)/2);
        const g = Math.floor((g1+g2)/2);
        const bl = Math.floor((b1+b2)/2);
        const alpha = (a1+a2)/2;
        const blended = `rgba(${r},${g},${bl},${alpha})`;

        a.color = blended;
        b.color = blended;

        // grow slightly, capped
        const growAmount = Math.min(Math.sqrt(a.size*a.size + b.size*b.size)*0.005, 15);
        a.size = Math.min(a.size + growAmount, 150);
        b.size = Math.min(b.size + growAmount, 150);
      }
    }
  }
}




function unmuteOnInteraction() {
  if (audioRef.value) {
    audioRef.value.muted = false;
    audioRef.value.play();
    window.removeEventListener('click', unmuteOnInteraction);
  }
}


  function loop() {
    updateBubbles();
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('click', unmuteOnInteraction);


</script>

<template>
  <main>
    <div
      class="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style="padding-top: 2.75rem;"
    >
      <div
        v-for="bubble in bubbles"
        :key="bubble.id"
        class="absolute rounded-full opacity-40 transition-all duration-500"
        :style="{
          width: bubble.merged ? bubble.size * 1.4 + 'px' : bubble.size + 'px',
          height: bubble.merged ? bubble.size * 1.4 + 'px' : bubble.size + 'px',
          top: bubble.top + '%',
          left: bubble.left + '%',
          backgroundColor: bubble.color,
          filter: bubble.merged
            ? 'blur(50px) brightness(1.2)'
            : 'blur(40px)',
          boxShadow: bubble.merged ? '0 0 30px 15px ' + bubble.color : 'none',
          transform: bubble.merged ? 'scale(1.1)' : 'scale(1)',
        }"
      ></div>
    </div>

    <audio
      ref="audioRef"
      autoplay
      loop
      muted
      src="@/assets/ambience.wav"
    ></audio>
  </main>
</template>

<style scoped>

</style>
