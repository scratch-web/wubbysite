<script setup lang="ts">
import { Play, Pause, Download } from 'lucide-vue-next'
import { reactive } from 'vue'

// Load all .mp4 files from src/assets/memes
const memeFiles = import.meta.glob('@/assets/memes/*.mp4', {
  eager: true,
  as: 'url'
}) as Record<string, string>

// Convert files into an array we can loop over with reactive aspectRatio
const memes = Object.entries(memeFiles).map(([path, url]) => {
  const name = path.split('/').pop()?.replace('.mp4', '') ?? 'unknown'
  return reactive({ name, url, aspectRatio: 1 })
})

// Store video elements so we can control them
const videoRefs = new Map<string, HTMLVideoElement>()

function setVideoRef(el: HTMLVideoElement | null, meme: typeof memes[number]) {
  if (el instanceof HTMLVideoElement) {
    videoRefs.set(meme.url, el)
    el.onloadedmetadata = () => {
      meme.aspectRatio = el.videoWidth / el.videoHeight
    }
  }
}

function togglePlay(url: string) {
  const video = videoRefs.get(url)
  if (!video) return

  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function isPlaying(url: string) {
  const video = videoRefs.get(url)
  return video ? !video.paused : false
}

function downloadMeme(url: string, name: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.mp4`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Meme Library</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="meme in memes"
        :key="meme.url"
        class="bg-background border rounded-xl overflow-hidden shadow flex flex-col"
      >
        <video
          :src="meme.url"
          preload="metadata"
          class="w-full object-contain bg-black"
          :style="{ height: meme.aspectRatio >= 1 ? '12rem' : (12 / meme.aspectRatio) + 'rem' }"
          :ref="el => setVideoRef(el as HTMLVideoElement | null, meme)"
        />

        <div class="p-3 flex items-center justify-between">
          <button @click="togglePlay(meme.url)" class="p-2 rounded hover:bg-muted">
            <component :is="isPlaying(meme.url) ? Pause : Play" class="w-5 h-5" />
          </button>

          <span class="text-sm font-medium truncate">{{ meme.name }}</span>

          <button @click="downloadMeme(meme.url, meme.name)" class="p-2 rounded hover:bg-muted">
            <Download class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
