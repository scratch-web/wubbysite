<script setup lang="ts">
import { ref } from 'vue';
import { useColorMode } from '@vueuse/core';

import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/SearchBar.vue';
import WorldCard from '@/components/WorldCard.vue';
import { WubbyAPIWorldInfo } from 'global';

const loading = ref(false);
const mode = useColorMode();
const skeletonCount = ref(0);

const searchResults = ref();
const creatorInfos = ref();

const searchWorld = async (query: string) => {
    if (loading.value || !query || query.length < 3) { 
        searchResults.value = !query || query.length < 3 ? [false, "Search query must be at least 3 characters long"] : null;
        return;
    }
    
    loading.value = true;
    searchResults.value = null;
    
    try {
        let response;
        const isUserQuery = query.toLowerCase().startsWith('user:');
        const isNumericQuery = /^[0-9]+$/.test(query);
        
        if (isUserQuery) {
            query = query.replace('user:', '');
            const userResponse = await fetch(`https://users.roproxy.com/v1/users/search?keyword=${encodeURIComponent(query)}&limit=10`).then(res => res.json());
            
            const matchedUser = userResponse.data.find((user: { name: string, previousUsernames: string[] }) => user.name.toLowerCase() === query.toLowerCase() || user.previousUsernames?.some((previousUsername) => previousUsername.toLowerCase() === query.toLowerCase()));            if (!matchedUser) {
                searchResults.value = [false, "No user found"];
                return;
            }
            
            response = await fetch(`https://api.wubbygame.com/v1/userworlds/${matchedUser.id}`).then(res => res.json());
        } else if (isNumericQuery) {
            skeletonCount.value = 1;
            response = await fetch(`https://api.wubbygame.com/v1/worldinfo/${parseInt(query)}`).then(res => res.json());
        } else {
            skeletonCount.value = Math.floor(Math.random() * 12) + 1;
            response = await fetch  (`https://api.wubbygame.com/v1/searchworld?query=${encodeURIComponent(query)}&limit=100`).then(res => res.json());
        }
        
        if ((Array.isArray(response) && response.length === 0) || (typeof response === 'object' && Object.keys(response).length === 0)) {
            searchResults.value = [false, "No results found"];
        } else if (Array.isArray(response) && response.length >= 1) {
            searchResults.value = [true, response];
        } else if (typeof response === 'object') {
            searchResults.value = [true, [response]];
        }
        
        if (!searchResults.value[0]) return;
        
        const creatorIds = searchResults.value[1]?.map((world: WubbyAPIWorldInfo) => world.creator) || [];
        
        if (creatorIds.length) {
            const creatorResponse = await fetch(`https://users.roproxy.com/v1/users`, {
                method: 'POST',
                body: JSON.stringify({
                    userIds: creatorIds,
                    excludeBannedUsers: false
                })
            }).then(res => res.json());
            
            creatorInfos.value = creatorResponse.data;
        }
    } catch (err: any) {
        if (err.response && err.response.status === 429) {
            searchResults.value = [false, "You are sending too many requests! Please try again later."];
            return;
        }
        
        console.warn(`Caught error: ${err}`);
        searchResults.value = [false, "An error occurred"];
    } finally {
        loading.value = false;
    }
};
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
        <p class="text-center" v-if="!loading && searchResults && !searchResults[0]">{{ searchResults[1] }}</p>
        <div v-else-if="!loading && searchResults && searchResults[0]" class="grid grid-cols-1 lg:grid-cols-2 min-[1363px]:grid-cols-3 min-[1776px]:grid-cols-4 gap-4">
            <WorldCard v-for="world in searchResults[1]" :key="world.id" :world="world" :creatorinfos="creatorInfos" />
        </div>
    </div>
</template>
