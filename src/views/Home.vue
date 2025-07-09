<script setup lang="ts">
import { ref, onMounted } from "vue";
import Hero from "@/components/Hero.vue";
import Statistics from "@/components/Statistics.vue";

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

function getRandomColor(): string {
  const colors = ['#00ffcc', '#00ff99', '#33ffcc', '#3399ff', '#66ccff', '#00ccff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateBubble(id: number): Bubble {
  const size = Math.floor(Math.random() * 100) + 80;
  return {
    id,
    baseTop: Math.random() * 80 + 10,
    baseLeft: Math.random() * 80 + 10,
    top: 0,
    left: 0,
    size,
    color: getRandomColor(),
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    merged: false,
  };
}

function updateBubbles() {
  for (const b of bubbles.value) {
    b.top = b.baseTop + Math.sin(Date.now() / 1000 + b.id) * 2;
    b.left = b.baseLeft + Math.cos(Date.now() / 1000 + b.id) * 2;

    b.baseTop += b.dy;
    b.baseLeft += b.dx;

    if (b.baseTop < 5 || b.baseTop > 95) b.dy = -b.dy;
    if (b.baseLeft < 5 || b.baseLeft > 95) b.dx = -b.dx;
  }

  for (const b of bubbles.value) b.merged = false;

  for (let i = 0; i < bubbles.value.length; i++) {
    for (let j = i + 1; j < bubbles.value.length; j++) {
      const a = bubbles.value[i];
      const b = bubbles.value[j];
      const dist = Math.hypot(a.left - b.left, a.top - b.top);
      if (dist < (a.size + b.size) / 50) {
        a.merged = true;
        b.merged = true;
      }
    }
  }
}

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    bubbles.value.push(generateBubble(i));
  }

  function loop() {
    updateBubbles();
    requestAnimationFrame(loop);
  }
  loop();
});
</script>

<template>
  <main class="relative min-h-screen overflow-hidden">
    <!-- Warning header banner -->
    <div class="fixed top-0 left-0 w-full bg-yellow-400 text-yellow-900 font-semibold text-center py-2 z-50 shadow-md">
      ⚠️ Since ownership has been transferred, multiple changes and restyling to the website will be coming soon.
    </div>

    <!-- Bubbles behind all content -->
    <div
      class="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style="padding-top: 2.75rem;"  <!-- offset so bubbles don't appear behind banner -->
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
          filter: bubble.merged ? 'blur(50px) brightness(1.2)' : 'blur(40px)',
          boxShadow: bubble.merged ? `0 0 30px 15px ${bubble.color}` : 'none',
          transform: bubble.merged ? 'scale(1.1)' : 'scale(1)',
        }"
      ></div>
    </div>

    <!-- Push page content down so it's not behind the fixed header -->
    <div class="pt-12">
      <Hero />
      <Statistics />
    </div>
  </main>
</template>

<style scoped>
/* Optional: smooth the fixed banner's shadow */
</style>
