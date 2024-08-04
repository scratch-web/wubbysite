<script setup lang="ts">
import { IMAGE_CAROUSEL } from "@/config";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
  <section class="container">
    <div
      class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32"
    >
      <div class="text-center space-y-8">
        <div
          class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold"
        >
          <h1>
            <span class="text-transparent bg-gradient-to-r from-[#1e71a5] to-[#2eac75] bg-clip-text">
              Wubby
            </span>
          </h1>
        </div>

        <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          Push the boundaries of the imaginable.
        </p>

        <Button class="w-5/6 md:w-1/4 font-bold group/arrow">
          Play
        </Button>
      </div>

      <div class="relative group mt-14">
        <div
          class="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"
        ></div>

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
              <img :src="image" class="h-full w-full rounded-lg" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div
          class="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"
        ></div>
      </div>
    </div>
  </section>
</template>
