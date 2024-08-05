<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import WorldCard from '@/components/WorldCard.vue'

const loading = ref(false);
const searchResults = ref();

const searchWorld = async (query: string) => {
    console.log(loading)
    if (loading?.value || !query) return;
    loading.value = true;
    try {
        const response = await fetch(`https://api.wubbygame.com/v1/searchworld?query=${query}&limit=100`)
            .then(response => response.json());

        if (!response || response.length === 0) {
            searchResults.value = "No results found"
            return;
        }


        //@ts-ignore
        const userIds = response.map(world => world.creator);
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
        .catch(() => null)

        searchResults.value = [response, usersResponse]
        return;
    } catch {
        searchResults.value = "An error occurred"
        return;
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <SearchBar @worldsearch="searchWorld" :loading="loading" />
    <div class="mt-4 pl-4 pr-4 min-[529px]:pl-16 min-[529px]:pr-16" v-if="searchResults">
        <p class="text-center" v-if="typeof searchResults === 'string'">{{ searchResults.valueOf() }}</p>
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 min-[1363px]:grid-cols-3 min-[1776px]:grid-cols-4 gap-4">
            <WorldCard v-for="world in searchResults[0]" :key="world.id" :world="world" :owners="searchResults[1]" />
        </div>
    </div>
</template>

