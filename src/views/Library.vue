<script setup lang="ts">
import { Play, Pause, Download, X } from 'lucide-vue-next'

const modules = import.meta.glob('@/assets/memes/*.mp4', {
  eager: true,
  as: 'url',
})

const memes = Object.entries(modules).map(([path, url]) => {
  const fileName = path.split('/').pop() || 'unknown'
  return {
    name: fileName.replace('.mp4', ''),
    url: url as string,
  }
})

const videoRefs = new Map<string, HTMLVideoElement>()
let activeMemeUrl: string | null = null

function setVideoRef(el: HTMLVideoElement | null, url: string) {
  if (el) videoRefs.set(url, el)
}

function togglePlay(url: string) {
  const video = videoRefs.get(url)
  if (!video) return

  // Pause all others
  for (const [otherUrl, otherVideo] of videoRefs) {
    if (otherUrl !== url) {
      otherVideo.pause()
    }
  }

  if (video.paused) {
    video.play()
    activeMemeUrl = url
  } else {
    video.pause()
    activeMemeUrl = null
  }
}

function closeViewer() {
  if (!activeMemeUrl) return
  const video = videoRefs.get(activeMemeUrl)
  video?.pause()
  activeMemeUrl = null
}

function downloadMeme(url: string, name: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.mp4`
  a.click()
}

function isPlaying(url: string) {
  return activeMemeUrl === url && !videoRefs.get(url)?.paused
}
</script>
<script setup lang="ts">
import { Play, Pause, Download, X } from 'lucide-vue-next'

const modules = import.meta.glob('@/assets/memes/*.mp4', {
  eager: true,
  as: 'url',
})

const memes = Object.entries(modules).map(([path, url]) => {
  const fileName = path.split('/').pop() || 'unknown'
  return {
    name: fileName.replace('.mp4', ''),
    url: url as string,
  }
})

const videoRefs = new Map<string, HTMLVideoElement>()
let activeMemeUrl: string | null = null

function setVideoRef(el: HTMLVideoElement | null, url: string) {
  if (el) videoRefs.set(url, el)
}

function togglePlay(url: string) {
  const video = videoRefs.get(url)
  if (!video) return

  // Pause all others
  for (const [otherUrl, otherVideo] of videoRefs) {
    if (otherUrl !== url) {
      otherVideo.pause()
    }
  }

  if (video.paused) {
    video.play()
    activeMemeUrl = url
  } else {
    video.pause()
    activeMemeUrl = null
  }
}

function closeViewer() {
  if (!activeMemeUrl) return
  const video = videoRefs.get(activeMemeUrl)
  video?.pause()
  activeMemeUrl = null
}

function downloadMeme(url: string, name: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.mp4`
  a.click()
}

function isPlaying(url: string) {
  return activeMemeUrl === url && !videoRefs.get(url)?.paused
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-4xl font-bold mb-6 text-center">Meme Library</h1>

    <!-- Grid -->
    <div
      class="grid gap-6
             grid-cols-1
             sm:grid-cols-2
             md:grid-cols-3
             lg:grid-cols-4"
    >
      <div
        v-for="meme in memes"
        :key="meme.url"
        class="bg-background border rounded-xl overflow-hidden shadow-sm"
      >
        <video
          :src="meme.url"
          class="w-full aspect-video bg-black cursor-pointer"
          preload="metadata"
          :ref="el => setVideoRef(el as HTMLVideoElement, meme.url)"
          @click="togglePlay(meme.url)"
        />

        <div class="flex items-center justify-between px-3 py-2">
          <button
            class="hover:text-primary transition"
            @click="togglePlay(meme.url)"
          >
            <component
              :is="isPlaying(meme.url) ? Pause : Play"
              class="w-5 h-5"
            />
          </button>

          <span class="text-sm font-medium truncate max-w-[60%]">
            {{ meme.name }}
          </span>

          <button
            class="hover:text-primary transition"
            @click="downloadMeme(meme.url, meme.name)"
          >
            <Download class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Expanded Viewer -->
    <div
      v-if="activeMemeUrl"
      class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
    >
      <div class="relative w-full max-w-5xl px-4">
        <button
          class="absolute -top-10 right-0 text-white hover:text-primary"
          @click="closeViewer"
        >
          <X class="w-6 h-6" />
        </button>

        <video
          :src="activeMemeUrl"
          class="w-full rounded-xl"
          controls
          autoplay
        />
      </div>
    </div>
  </div>
</template>
