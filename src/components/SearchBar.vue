<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-vue-next'
import { Loader2 } from 'lucide-vue-next'

const searchValue = ref('')

// Accept the loading prop
const props = defineProps<{
    loading: boolean
}>();

const emit = defineEmits(['worldsearch'])

const emitSearch = () => {
  emit('worldsearch', searchValue.value)
}
</script>

<template>
  <div class="flex items-center justify-center h-full mt-24 space-x-2">
    <Input
      v-model="searchValue"
      @keyup.enter="emitSearch"
      placeholder="Search..."
      class="w-80"
    />

    <Button
      @click="emitSearch"
      variant="outline"
      size="icon"
      :disabled="props.loading"
    >
      <template v-if="props.loading">
        <Loader2 class="w-5 h-5 animate-spin" />
      </template>
      <Search v-else class="w-5 h-5" />
    </Button>
  </div>
</template>
