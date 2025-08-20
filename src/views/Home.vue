<script setup lang="ts">
import { ref, onMounted } from "vue";
import Hero from "@/components/Hero.vue";


// Bubble type (keep in your codebase wherever you already define types)
interface Bubble {
  id: number
  baseTop: number
  baseLeft: number
  top: number
  left: number
  size: number
  color: string
  dx: number
  dy: number
}

// get dimmer random color
function getRandomColor(): string {
  const colors = [
    'rgba(0, 255, 204, 0.6)',
    'rgba(0, 255, 153, 0.6)',
    'rgba(51, 204, 255, 0.6)',
    'rgba(51, 153, 255, 0.6)',
    'rgba(102, 204, 255, 0.6)',
    'rgba(0, 204, 255, 0.6)',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// blend two rgba colors
function blendColors(c1: string, c2: string): string {
  const parse = (c: string) =>
    c
      .replace(/[rgba()]/g, '')
      .split(',')
      .map((n) => parseFloat(n.trim()))

  const [r1, g1, b1, a1 = 1] = parse(c1)
  const [r2, g2, b2, a2 = 1] = parse(c2)

  const r = Math.floor((r1 + r2) / 2)
  const g = Math.floor((g1 + g2) / 2)
  const b = Math.floor((b1 + b2) / 2)
  const a = (a1 + a2) / 2

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

// make a bubble
function generateBubble(id: number): Bubble {
  const size = Math.floor(Math.random() * 100) + 80
  const baseTop = Math.random() * 80 + 10
  const baseLeft = Math.random() * 80 + 10

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
  }
}

// update + merging logic
function updateBubbles(bubbles: Bubble[]) {
  // movement
  for (const b of bubbles) {
    b.top = b.baseTop + Math.sin(Date.now() / 1000 + b.id) * 2
    b.left = b.baseLeft + Math.cos(Date.now() / 1000 + b.id) * 2

    b.baseTop += b.dy
    b.baseLeft += b.dx

    if (b.baseTop < 5 || b.baseTop > 95) b.dy = -b.dy
    if (b.baseLeft < 5 || b.baseLeft > 95) b.dx = -b.dx
  }

  // merging
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      const a = bubbles[i]
      const b = bubbles[j]
      const dist = Math.hypot(a.left - b.left, a.top - b.top)

      if (dist < (a.size + b.size) / 50) {
        const merged: Bubble = {
          id: Date.now() + Math.random(),
          top: (a.top + b.top) / 2,
          left: (a.left + b.left) / 2,
          baseTop: (a.baseTop + b.baseTop) / 2,
          baseLeft: (a.baseLeft + b.baseLeft) / 2,
          size: Math.sqrt(a.size * a.size + b.size * b.size), // area combine
          color: blendColors(a.color, b.color),
          dx: (a.dx + b.dx) / 2,
          dy: (a.dy + b.dy) / 2,
        }

        bubbles.splice(j, 1)
        bubbles.splice(i, 1, merged)
        return // restart loop to avoid index issues
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

onMounted(async () => {
  for (let i = 0; i < 20; i++) {
    bubbles.value.push(generateBubble(i));
  }

  try {
    const res = await fetch('https://discord.com/api/guilds/1049644155246227466/widget.json');
    const data = await res.json();
    presenceCount.value = data.presence_count;
  } catch (err) {
    console.error('Error fetching Discord widget:', err);
  }
});


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

    <div class="pt-12">
      <Hero />
      <section
        class="container max-w-screen-xl mx-auto my-10 p-6 rounded-2xl bg-black border border-gray-800 text-gray-200 font-semibold text-center flex items-center justify-center space-x-3 shadow-md"
        role="region"
        aria-label="What is Wubby"
      >
        <p class="m-0 text-lg max-w-xl">
          Wubby is a ROBLOX building game where you can create your own worlds or play worlds created by the community. In Wubby, many tools exist for creating your own worlds, such as placing blocks, painting, transforming, editing, and adding custom logic! 
          Wubby also offers an easy-to-use wiring system, which allows you to create complex game mechanics and interactive systems to bring life to your worlds. The building tools are also intuitive and easy to use, making it easy for players of all levels to design amazing worlds.
          Whether you are an experienced game developer or just starting, Wubby offers a fun and creative experience that allows you to explore your ideas and push the boundaries of the imaginable.
          <br /><br />
          Wubby currently has a relatively small community compared to what was World Builder, its ancestor with only around <b>{{ presenceCount }}</b> reocurring members (Wubby, not World Builder).
        </p>
      </section>
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
/* Optional: smooth the fixed banner's shadow */
</style>
