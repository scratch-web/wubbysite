<script setup lang="ts">
import { Play, Download } from 'lucide-vue-next'

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

function setVideoRef(el: HTMLVideoElement | null, url: string) {
  if (el) videoRefs.set(url, el)
}

function togglePlay(url: string) {
  const video = videoRefs.get(url)
  if (!video) return

  video.paused ? video.play() : video.pause()
}

function downloadMeme(url: string, name: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.mp4`
  a.click()
}
</script>


<template>
  <div class="p-6">
    <h1 class="text-4xl font-bold mb-6 text-center">Meme Browser</h1>

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
        <!-- Video -->
        <video
          :src="meme.url"
          class="w-full aspect-video bg-black"
          preload="metadata"
          :ref="el => setVideoRef(el as HTMLVideoElement, meme.url)"
        />

        <!-- Controls -->
        <div class="flex items-center justify-between px-3 py-2">
          <button
            class="hover:text-primary transition"
            @click="togglePlay(meme.url)"
          >
            <Play class="w-5 h-5" />
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
  </div>
</template>
