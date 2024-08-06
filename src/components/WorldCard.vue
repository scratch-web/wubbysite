<script setup lang="ts">
import { UUID } from 'crypto';
import { List, Lock, Trash2 } from 'lucide-vue-next';
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
    <div
      class="absolute inset-0 flex items-center justify-center"
      v-if="[2, 3, 4].includes(props.world.privacyState)"
    >
      <div class="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <div v-if="props.world.privacyState === 2" class="text-center">
          <Lock class="h-16 w-16 text-white" />
          Private
        </div>
        <div v-else-if="props.world.privacyState === 3" class="text-center">
          <List class="h-16 w-16 text-white" />
          Whitelist
        </div>
        <div v-else-if="props.world.privacyState === 4" class="text-center">
          <Trash2 class="h-16 w-16 text-white" />
          Deleted
        </div>
      </div>
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-50%"></div>

    <img
      :src="`${Array.isArray(props.world.thumbnails) && props.world.thumbnails[0] 
      ? `https://assetdelivery.roblox.com/v1/asset/?id=${props.world.thumbnails[0]}` 
      : 'https://media.choke.dev/ShareX/2024/08/Roblox_AssetUnavailable.png'}`"
      class="w-full h-60 object-cover mw-full"
    />

    <div class="absolute bottom-1 left-1 bg-black bg-opacity-0 p-2 rounded text-white text-left">
      <p class="text-base text-stroke font-bold font-figtree">{{ props.world.name }}</p>
      <p class="text-xs text-stroke">
        <a target="_blank" :href="`https://www.roblox.com/users/${props.world.creator.id}/profile`"
          >@{{ props.world.creator.name }}</a
        >
      </p>
      <p class="text-xs text-stroke">{{ props.world.id }}</p>
    </div>

    <div class="absolute bottom-1 right-1 bg-black bg-opacity-0 p-2 rounded text-white text-right">
      <p class="text-xs text-stroke">{{ props.world.visits }} visits</p>
      <p class="text-xs text-stroke">{{ props.world.blocks }} blocks</p>
    </div>
  </div>
</template>

<style scoped>
.text-stroke {
  text-shadow: 
    -1px -1px 0 rgba(0, 0, 0, 0.2),
     1px -1px 0 rgba(0, 0, 0, 0.2),
    -1px  1px 0 rgba(0, 0, 0, 0.2),
     1px  1px 0 rgba(0, 0, 0, 0.2);
}
</style>