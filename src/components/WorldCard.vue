<script setup lang="ts">
import { WubbyAPIWorldInfo } from 'global';
import { Badge } from '@/components/ui/badge'
import { List, Lock, Trash2 } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const props = defineProps<{
  world: WubbyAPIWorldInfo,
  creatorinfos: { id: number, name: string, displayName: string }[],
}>();

const currentIndex = ref(0);
const thumbnails = computed(() => props.world.thumbnails);

function updateIndex() {
  if (thumbnails.value.length > 1) {
    currentIndex.value = (currentIndex.value + 1) % thumbnails.value.length;
  }
}

const creatorDetails = computed(() => {
  return props.creatorinfos.find(creator => creator.id === props.world.creator)
})

setInterval(updateIndex, 7000);
</script>

<template>
  <div 
  :class="{
    'relative rounded-lg shadow-md overflow-hidden min-w-[300px]': true,
    'outline outline-4 outline-yellow-300': props.world.isFeatured
  }"
  >
  
  <div v-if="thumbnails.length >= 2 " class="relative w-full h-60 overflow-hidden">
    <transition name="fade">
      <img
      :key="thumbnails[currentIndex]"
      :src="`https://assetdelivery.roblox.com/v1/asset/?id=${thumbnails[currentIndex]}`"
      class="absolute inset-0 w-full h-full object-cover"
      />
    </transition>
  </div>
  
  <img
  v-else
  :src="`${thumbnails.length === 1
  ? `https://assetdelivery.roblox.com/v1/asset/?id=${thumbnails[0]}` 
  : 'https://media.choke.dev/ShareX/2024/08/Roblox_AssetUnavailable.png'}`"
  onerror="this.onerror=null;this.src='https://media.choke.dev/ShareX/2024/08/Roblox_AssetUnavailable.png'"
  class="w-full h-60 object-cover"
  />
  
  <div
  class="absolute inset-0 flex items-center justify-center"
  v-if="[2, 3, 4].includes(props.world.privacyState)"
  >
  <div class="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
    <div v-if="props.world.privacyState === 2" class="text-center text-white">
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

<div v-if="props.world.isFeatured" class="absolute left-0 top-0 bg-black bg-opacity-0 p-2 rounded text-white text-right">
  <Badge class="border-transparent bg-[#fde047] bg-opacity-80 text-primary-foreground hover:bg-primary/80">Featured</Badge>
</div>

<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-50%"></div>
<div class="absolute bottom-1 left-1 bg-black bg-opacity-0 p-2 rounded text-white text-left">
  <p class="text-base text-stroke font-bold font-figtree">{{ props.world.name }}</p>
  <p class="text-xs text-stroke">
    <a target="_blank" :href="`https://www.roblox.com/users/${props.world.creator}/profile`">
      @{{ creatorDetails ? creatorDetails.name : props.world.creator }}
    </a>
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

/* old image fade out */
.fade-enter-from, .fade-leave-to {
  transition: opacity 3s;
  opacity: 0;
}

/* new image fade in */
.fade-enter-to, .fade-leave-from {
  transition: opacity 3s;
  opacity: 1;
}
</style>