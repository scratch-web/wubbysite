<script setup lang="ts">
import { FileQuestion } from 'lucide-vue-next';
</script>

<template>
  <div class="flex items-center justify-center h-full mt-24">
    <div class="text-center">
      <FileQuestion class="w-32 h-32 mx-auto" />
      <h1 class="text-4xl my-4 font-bold">Page not found</h1>
      <p>
        You seem lost wubbian, perhaps you should return to the 
        <RouterLink to="/" class="text-primary hover:underline">homepage</RouterLink>?
      </p>
    </div>
  </div>
</template>

