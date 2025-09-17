<script setup lang="ts">
import Separator from "./ui/separator/Separator.vue";
</script>

<template>
  <footer
    id="footer"
    class="container py-24 sm:py-16"
  >
    <div class="p-10 bg-muted dark:bg-card border rounded-2xl">
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div class="col-span-full xl:col-span-2">
          <a href="/" class="flex font-bold items-center">
            <img src='/src/assets/favicon.svg' width="32" height="32" class="mr-2"/>
            <h3 class="text-2xl">Wubby</h3>
          </a>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Help</h3>
          <div>
            <a href="mailto:admin@wubbygame.com" class="opacity-60 hover:opacity-100">
              Contact Us
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Socials</h3>
          <div>
            <a href="https://discord.gg/rAvmwWYJC3" class="opacity-60 hover:opacity-100">
              Discord
            </a>
          </div>
          <div>
            <a href="https://www.roblox.com/groups/16993480" class="opacity-60 hover:opacity-100">
              Roblox group
            </a>
          </div>
        </div>
      </div>

      <Separator class="my-6" />
      <section>
        <p>
          Want to see your world featured on the site homepage? 
          <a class="text-primary" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfg9hSq-xisJM2zUxMGzzkjcRL5qoSjMdCjdlOrWupY27MLkQ/viewform">
            Submit an application here
          </a>!
        </p>
        <h3 class="text-zinc-600">
          made by _choke/sonofeightless.
        </h3>
        <h2 class="text-zinc-600">
          &copy; {{ new Date().getFullYear() }} wireframe. All rights reserved.
        </h2>
      </section>
    </div>
  </footer>
</template>

<style scoped>
/* No fade overlay, so no extra styles needed */
</style>
