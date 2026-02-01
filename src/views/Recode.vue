<template>
  <div
    class="pt-16 px-5 h-1/4 p-10 bg-muted/50 dark:bg-card border rounded-2xl text-white font-sans text-center mx-auto max-w-3xl"
  >
    <div class="space-y-8">
      <div class="max-w-screen-md mx-auto text-5xl md:text-6xl font-bold">
        <h1>
          <span
            class="text-transparent bg-gradient-to-r from-[#1e71a5] to-[#2eac75] bg-clip-text"
          >
            Recode Timer
          </span>
        </h1>
      </div>
      <h2 class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
        ESTIMATED Recode release date: <span>{{ countdown }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "WubbyCountdown",
  data() {
    return {
      countdown: "Loading...",
      releaseDate: new Date("April 23, 2026 00:00:00").getTime(),
      interval: null,
    };
  },
  mounted() {
    this.updateCountdown();
    this.interval = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    updateCountdown() {
      const now = Date.now();
      const diff = this.releaseDate - now;

      if (diff <= 0) {
        this.countdown = "Released!";
        clearInterval(this.interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    },
  },
};
</script>

<style scoped>
.text-muted-foreground {
  color: rgba(255, 255, 255, 0.8);
}
</style>
