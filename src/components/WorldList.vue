<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import WorldCard from '@/components/WorldCard.vue'

const loading = ref(false);
const searchResults = ref();

const searchWorld = async (query: string) => {
    loading.value = true; // Set loading to true when starting the search
    try {
        const response = await fetch(`https://api.wubbygame.com/v1/searchworld?query=${query}&limit=100`)
            .then(response => response.json());

        if (!response || response.length === 0) {
            searchResults.value = "No results found"
            return;
        }

        searchResults.value = response
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
    <div class="mt-4 pl-16 pr-16" v-if="searchResults">
        <p class="text-center" v-if="typeof searchResults === 'string'">{{ searchResults.valueOf() }}</p>
        <div v-else class="grid grid-cols-4 gap-4">
            <WorldCard v-for="world in searchResults" :key="world.id" :world="world"/>
        </div>
    </div>
</template>

