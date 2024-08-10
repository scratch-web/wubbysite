<script setup lang="ts">
import { IMAGE_CAROUSEL } from "@/config";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { onMounted, ref } from "vue";
import axios from "axios";
import { WubbyAPIWorldInfo } from "@/../global";
import { LoaderCircle } from "lucide-vue-next";

const worldData = ref<Record<number, (Omit<WubbyAPIWorldInfo, 'creator'> & {
  creator: {
    id: number;
    name: string;
    displayName: string;
  };
  url: string;
}) | null>>({});
const loadingImageDetails = ref<boolean>(true);

onMounted(async () => {
  try {
    const promises = IMAGE_CAROUSEL.IMAGES.map(async (image) => {
      // Fetch world info
      const { data } = await axios.get(`https://api.wubbygame.com/v1/worldinfo/${image.id}`);
      
      // If data is present, fetch creator details
      if (data) {
        const userResponse = await axios.post('https://users.roproxy.com/v1/users', {
          userIds: [data.creator],
          excludeBannedUsers: false
        });
        
        const creatorDetails = userResponse.data.data?.[0] || null;
        worldData.value[image.id] = creatorDetails 
          ? { ...data, url: image.url, creator: creatorDetails } 
          : { ...data, url: image.url };
      } else {
        worldData.value[image.id] = null;
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error("Error fetching world info:", error);
  } finally {
    loadingImageDetails.value = false;
  }
});
</script>

<template>
  <section class="container">
    <div class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
      <div class="text-center space-y-8">
        <div class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold">
          <h1>
            <span class="text-transparent bg-gradient-to-r from-[#1e71a5] to-[#2eac75] bg-clip-text">
              Wubby
            </span>
          </h1>
        </div>
        <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          Push the boundaries of the imaginable.
        </p>
        <a href="https://www.roblox.com/games/12519560096" target="_blank">
          <Button class="w-5/6 md:w-1/4 mt-8 font-bold bg-[#00b06f]">Play</Button>
        </a>
      </div>
      <div class="relative group mt-14">
        <div class="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
        <Carousel
          class="w-full mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-t-primary/30"
          :plugins="[
            Autoplay({
              delay: IMAGE_CAROUSEL.DELAY,
              stopOnInteraction: false
            })
          ]"
          :opts="{
            loop: true,
          }"
        >
          <CarouselContent class="rounded-lg">
            <CarouselItem v-for="(image, index) in IMAGE_CAROUSEL.IMAGES" :key="index">
              <div class="relative" v-if="image">
                <img :src="image.url" class="h-full w-full rounded-lg" />
                <div class="absolute bottom-0 left-0 w-full md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
                <div class="absolute bottom-1 left-1 p-2 rounded text-white">
                  <LoaderCircle class="w-12 h-12 animate-spin" v-if="loadingImageDetails"/>
                  <div class="text-xs" v-else-if="image.id in worldData">
                    <h1 class="font-bold text-base">{{ worldData[image.id]?.name }}</h1>
                    <a :href="`https://www.roblox.com/users/${worldData[image.id]?.creator.id}/profile`" target="_blank">@{{ worldData[image.id]?.creator.name }}</a>
                    <p>{{ image.id }}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        
      </div>
    </div>
  </section>
</template>
