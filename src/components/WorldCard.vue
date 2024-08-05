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
  owners: { hasVerifiedBadge: boolean, id: number, name: string, displayName: string }[]
}>();
</script>

<template>
  <div class="relative rounded-lg shadow-md overflow-hidden min-w-[400px]">
    <img :src="`${props.world.thumbnails[0] ? `https://assetdelivery.roblox.com/v1/asset/?id=${props.world.thumbnails[0]}` : 'https://media.choke.dev/ShareX/2024/08/Roblox_AssetUnavailable.png'}`" class="w-full h-60 object-cover mw-full" />

    <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 p-2 rounded text-white">
      <p class="text-xs">{{ props.world.name }}</p>
      <p class="text-xs" v-if="props.owners">Creator: <a target="_blank" :href="`https://www.roblox.com/users/${props.world.creator}/profile`">@{{ props.owners?.filter(owner => owner.id === props.world.creator)[0].name }}</a></p>
      <p class="text-xs">World ID: {{ props.world.id }}</p>
    </div>
    
    <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded text-white">
      <p class="text-xs">Visits: {{ props.world.visits }} visits</p>
      <p class="text-xs">Blocks: {{ props.world.blocks }} blocks</p>
    </div>
  </div>
</template>
