<template>
  <div>
  <div>
  <div class="text-center space-y-8">
    <div class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold">
      <h1>
        <span class="text-transparent bg-gradient-to-r from-[#1e71a5] to-[#2eac75] bg-clip-text">
          Wubby
        </span>
      </h1>
    </div>
    <h2 class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
      Recode release date: <span>{{ countdown }}</span>
    </h2>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'WubbyCountdown',
  data() {
    return {
      countdown: 'Loading...',
      releaseDate: new Date('March 28, 2036 00:00:00').getTime(),
      interval: null
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
        this.countdown = 'Released!';
        clearInterval(this.interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }
};
</script>

<style scoped>
body {
  background-color: #000;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 50px 20px;
}
.text-center {
  text-align: center;
}
.space-y-8 > * + * {
  margin-top: 2rem;
}
.max-w-screen-md {
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
}
.max-w-screen-sm {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.text-5xl {
  font-size: 3rem;
  line-height: 1.2;
}
.md\:text-6xl {
  font-size: 3.75rem;
}
.font-bold {
  font-weight: 700;
}
.text-muted-foreground {
  color: #ffffff;
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #1e71a5, #2eac75);
}
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
