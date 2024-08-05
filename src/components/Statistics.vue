<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const stats = ref<{ worlds: { total: number; featured: number }, blocks: number }>();

onMounted(async () => {
    const response = await axios.get('https://api.wubbygame.com/statistics')
    stats.value = response.data
})
</script>

<template>
    <div class="text-center font-bold md:text-5xl">
        <h1>Statistics</h1>
    </div>
    <Table class="mt-4 max-w-[600px] mx-auto">
    <TableHeader>
      <TableRow>
        <TableHead class="text-left">Statistic</TableHead>
        <TableHead class="text-right">Count</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium text-left">Total Worlds</TableCell>
        <TableCell class="text-right">{{ stats?.worlds.total?.toLocaleString("en-US") }}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium text-left">Total Blocks</TableCell>
        <TableCell class="text-right">{{ stats?.blocks?.toLocaleString("en-US") }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
    
</template>
