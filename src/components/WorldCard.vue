<script setup lang="ts">
import { UUID } from 'crypto';
import { defineProps } from 'vue';

interface World {
  id: number;
  activePlayers: string[] | { username: string, displayName: string, permission: number }[];
  blocks: number;
  bannedPlayers: unknown[];
  creator: { id: number, name: string, displayName: string };
  description: string;
  favorites: number;
  isFeatured: boolean;
  maxPlayers: number;
  name: string;
  privateWhitelistedPlayers: number[];
  privacyState: number;
  serverJobId: UUID;
  thirdPartyWarpInfo: boolean;
  thirdPartyWarps: boolean;
  thumbnails: number | number[];
  visits: number;
  whitelistedPlayers: number[];
}

const props = defineProps<{
  world: World;
}>();
</script>

<template>
  <div class="relative rounded-lg shadow-md overflow-hidden min-w-[400px]">
    
    <img
    :src="`${Array.isArray(props.world.thumbnails) && props.world.thumbnails[0] 
    ? `https://assetdelivery.roblox.com/v1/asset/?id=${props.world.thumbnails[0]}` 
    : 'https://media.choke.dev/ShareX/2024/08/Roblox_AssetUnavailable.png'}`"
    class="w-full h-60 object-cover mw-full"
    />
    
    <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 p-2 rounded text-white text-left">
      <p class="text-sm font-bold">{{ props.world.name }}</p>
      <p class="text-xs"><a target="_blank" :href="`https://www.roblox.com/users/${props.world.creator.id}/profile`">@{{ props.world.creator.name }}</a></p>
      <p class="text-xs">{{ props.world.id }}</p>
    </div>
    
    <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded text-white text-right">
      <p class="text-xs">{{ props.world.visits }} visits</p>
      <p class="text-xs">{{ props.world.blocks }} blocks</p>
    </div>
  </div>
</template>
