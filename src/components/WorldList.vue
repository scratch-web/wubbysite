<script setup lang="ts">
import { ref } from 'vue';
import { UUID } from 'crypto';
import { useColorMode } from '@vueuse/core';

import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/SearchBar.vue';
import WorldCard from '@/components/WorldCard.vue';

const loading = ref(false);
const mode = useColorMode();
const searchResults = ref();
const skeletonCount = ref(0);

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

const searchWorld = async (query: string) => {
    if (loading?.value || !query) return;
    loading.value = true;
    skeletonCount.value = Math.floor(Math.random() * 12) + 1;
    searchResults.value = null;
    
    try {
        const response = await fetch(`https://api.wubbygame.com/v1/searchworld?query=${encodeURIComponent(query)}&limit=100`)
        .then(response => response.json());
        
        if (!response || response.length === 0) {
            searchResults.value = "No results found";
            return;
        }
        
        const userIds = response.map((world: World) => world.creator);
        const usersResponse = await fetch("https://thingproxy.freeboard.io/fetch/https://users.roblox.com/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userIds,
                "excludeBannedUsers": false
            })
        })
        .then(response => response.json())
        .then(data => data.data)
        .catch(() => null);
        
        searchResults.value = [response, usersResponse];
    } catch {
        searchResults.value = "An error occurred";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="flex items-center justify-center">
        <SearchBar @worldsearch="searchWorld" :loading="loading" />
    </div>
    <div class="mt-4 pl-4 pr-4 min-[529px]:pl-16 min-[529px]:pr-16">
        <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 min-[1363px]:grid-cols-3 min-[1776px]:grid-cols-4 gap-4">
            <Skeleton v-for="n in skeletonCount" :key="n" :class="{
                'relative bg-white rounded-lg shadow-md overflow-hidden min-w-[400px] h-60': true,
                'bg-neutral-200': mode.valueOf() == 'light',
                'bg-neutral-800': mode.valueOf() == 'dark',
            }" />
        </div>
        <p class="text-center" v-if="searchResults && typeof searchResults === 'string'">{{ searchResults.valueOf() }}</p>
        <div v-else-if="searchResults" class="grid grid-cols-1 lg:grid-cols-2 min-[1363px]:grid-cols-3 min-[1776px]:grid-cols-4 gap-4">
            <WorldCard v-for="world in searchResults[0]" :key="world.id" :world="world" :owners="searchResults[1]" />
        </div>
    </div>
</template>
