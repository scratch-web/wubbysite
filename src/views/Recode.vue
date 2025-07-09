<template>
  <div class="recode-meme-page">

    <nav class="navbar">
      <ul class="nav-list">
        <li><a href="/">Home</a></li>
        <li><a href="/worlds">Worlds</a></li>
        <li><a href="/recode" class="active">Recode</a></li>
        <li><a href="https://wiki.wubbygame.com" target="_blank" rel="noopener">Wiki</a></li>
      </ul>
    </nav>

    <main class="content">
      <section class="header-section">
        <h1>Wubby Recode Status</h1>
        <p>Hazel’s been “working on the recode” since forever...</p>
      </section>

      <section class="countdown-section">
        <div class="countdown-timer">{{ countdownMessage }}</div>
        <button @click="resetTimer" class="reset-btn">Reset Timer (Why bother?)</button>
      </section>

      <section class="meme-text">
        <p>
          <strong>Official update:</strong> Still coding... or maybe just procrastinating. 🤷‍♂️
        </p>
        <p>Check back in 5 years or so!</p>
      </section>

      <section class="meme-image">
        <img src="https://i.imgur.com/8Km9tLL.gif" alt="Working hard meme" />
      </section>
    </main>

  </div>
</template>

<script>
export default {
  name: "RecodeMemePage",
  data() {
    return {
      countdownMessage: "Still working... please wait.",
      intervalId: null,
      secondsPassed: 0
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.secondsPassed++;
      if (this.secondsPassed > 999999) {
        this.secondsPassed = 0; // Reset after forever
      }
      this.countdownMessage = `Still working... ${this.secondsPassed} seconds of procrastination elapsed.`;
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    resetTimer() {
      this.secondsPassed = 0;
      this.countdownMessage = "Timer reset — but nothing changed!";
    }
  }
};
</script>

<style scoped>
.recode-meme-page {
  background-color: #111;
  color: #eee;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #222;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.nav-list li a {
  color: #eee;
  text-decoration: none;
  font-weight: 600;
}

.nav-list li a.active,
.nav-list li a:hover {
  color: #4caf50;
  text-decoration: underline;
}

.content {
  flex-grow: 1;
  padding: 70px 20px 40px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.header-section h1 {
  font-size: 2.5rem;
  margin-bottom: 0.2rem;
}

.countdown-section {
  margin: 30px 0;
}

.countdown-timer {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.reset-btn {
  background-color: #4caf50;
  border: none;
  padding: 10px 20px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: #388e3c;
}

.meme-text {
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: #ccc;
}

.meme-image img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 20px #4caf50aa;
}
</style>
