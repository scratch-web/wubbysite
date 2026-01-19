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
