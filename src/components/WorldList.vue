<script setup lang="ts">
import { ref } from 'vue';
import { useColorMode } from '@vueuse/core';

import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/SearchBar.vue';
import WorldCard from '@/components/WorldCard.vue';
import { WubbyAPIWorldInfo } from 'global';

const loading = ref(false);
const mode = useColorMode();
const searchResults = ref();
const skeletonCount = ref(0);

const searchWorld = async (query: string) => {
    if (loading?.value) return;
    
    // Validate the query
    if (!query) {
        searchResults.value = null;
        return;
    }
    if (query.length < 3) {
        searchResults.value = [false, "Search query must be at least 3 characters long"];
        return;
    }
    
    loading.value = true;
    searchResults.value = null;
    
    try {
        
        const isNumericQuery = /^[0-9]+$/.test(query);
        
        if (isNumericQuery) {
            skeletonCount.value = 1;
            const response = await fetch(`https://api.wubbygame.com/v1/worldinfo/${parseInt(query)}`).then(res => res.json());
            searchResults.value = [true, [response]];
        } else {
            skeletonCount.value = Math.floor(Math.random() * 12) + 1;
            const response = await fetch(`https://api.wubbygame.com/v1/searchworld?query=${encodeURIComponent(query)}&limit=100`).then(res => res.json());
            searchResults.value = response.length ? [true, response] : [false, "No results found"];
        }
        
        if (searchResults.value[0]) {
            const creatorUserIds: number[] = [];
            searchResults.value[1].forEach((world: WubbyAPIWorldInfo) => {
                creatorUserIds.push(world.creator);
            });
            
            const response: { id: number; name: string; displayName: string }[] = await fetch('https://users.roproxy.com/v1/users', {
                method: "POST",
                body: JSON.stringify({
                    userIds: creatorUserIds,
                    excludeBannedUsers: false
                })
            }).then(res => res.json()).then(res => res.data);
            
            const userMap = new Map<number, { id: number; name: string; displayName: string }>();
            response.forEach(user => {
                userMap.set(user.id, user);
            });
            
            searchResults.value[1].forEach((world: WubbyAPIWorldInfo) => {
                const userResponse = userMap.get(world.creator);
                if (userResponse) {
                    // @ts-ignore
                    world.creator = {
                        id: userResponse.id,
                        name: userResponse.name,
                        displayName: userResponse.displayName
                    };
                }
            });
        }
        
        
    } catch (err) {
        searchResults.value = [false, "An error occurred"];
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
        <p class="text-center" v-if="searchResults && !searchResults[0]">{{ searchResults[1] }}</p>
        <div v-else-if="searchResults && searchResults[0]" class="grid grid-cols-1 lg:grid-cols-2 min-[1363px]:grid-cols-3 min-[1776px]:grid-cols-4 gap-4">
            <WorldCard v-for="world in searchResults[1]" :key="world.id" :world="world" />
        </div>
    </div>
</template>
