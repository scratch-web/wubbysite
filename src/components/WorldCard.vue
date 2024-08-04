<script setup lang="ts">
import { UUID } from 'crypto';
import { defineProps } from 'vue';

// Define the props interface for TypeScript
interface World {
  id: string;
  activePlayers: number;
  blocks: number;
  bannedPlayers: string[];
  creator: number;
  description: string;
  favorites: number | null;
  isFeatured: boolean;
  maxPlayers: number;
  name: string;
  privateWhitelistedPlayers: number[];
  privacyState: number;
  serverJobId: UUID;
  thirdPartyWarps: boolean | null;
  thumbnails: number[];
  visits: number;
  whitelistedPlayers: number[];
}

// Accept the `world` prop
const props = defineProps<{
  world: World;
}>();
</script>

<template>
  <div class="relative bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Image section -->
    <img :src="`https://assetdelivery.roblox.com/v1/asset/?id=${props.world.thumbnails[0]}`" alt="World Image" class="w-full h-60 object-cover" />

    <!-- Overlay text on the lower left corner -->
    <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 p-2 rounded text-white">
      <p class="text-xs">{{ props.world.name }}</p>
      <p class="text-xs">World ID: {{ props.world.id }}</p>
    </div>

    <!-- Additional info or content can be added here -->
    <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded text-white">
      <p class="text-xs">Visits: {{ props.world.visits }} visits</p>
      <p class="text-xs">Blocks: {{ props.world.blocks }} visits</p>
    </div>
  </div>
</template>

<style scoped>
/* Optional styling */
img {
  display: block;
}
</style>
