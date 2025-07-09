<script setup lang="ts">
import { ref, onMounted } from "vue";
import Hero from "@/components/Hero.vue";
import Statistics from "@/components/Statistics.vue";

// Bubble logic
const bubbles = ref<{ id: number; size: number; top: number; left: number; color: string; duration: number }[]>([]);

function getRandomColor(): string {
  const colors = ['#00ffcc', '#00ff99', '#33ffcc', '#3399ff', '#66ccff', '#00ccff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateBubble(id: number) {
  return {
    id,
    size: Math.floor(Math.random() * 200) + 100,
    top: Math.random() * 100,
    left: Math.random() * 100,
    color: getRandomColor(),
    duration: Math.random() * 5 + 3,
  };
}

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    bubbles.value.push(generateBubble(i));
  }
});
</script>

<template>
  <main class="relative w-full min-h-screen overflow-hidden">
    <!-- Global Bubble Background -->
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        v-for="bubble in bubbles"
        :key="bubble.id"
        class="absolute rounded-full opacity-40 animate-pulse"
        :style="{
          width: bubble.size + 'px',
          height: bubble.size + 'px',
          top: bubble.top + '%',
          left: bubble.left + '%',
          backgroundColor: bubble.color,
          animationDuration: bubble.duration + 's',
          filter: 'blur(40px)',
        }"
      ></div>
    </div>

    <!-- Page Content -->
    <Hero />
    <Statistics />
  </main>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

.animate-pulse {
  animation-name: pulse;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
</style>
