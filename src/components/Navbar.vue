<script lang="ts" setup>
import { ref, computed } from "vue";
import { useColorMode } from "@vueuse/core";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Menu, ChevronLeft, ChevronRight } from "lucide-vue-next";
import ToggleTheme from "./ToggleTheme.vue";
import DiscordIcon from "@/icons/DiscordIcon.vue";
import { routeList } from "@/config";

const mode = useColorMode();
mode.value = "dark";

const isOpen = ref(false); // for mobile sheet
const collapsed = ref(false); // for desktop sidebar

const sidebarWidth = computed(() => (collapsed.value ? "w-16" : "w-64"));
</script>

<template>
  <div class="flex h-screen bg-background text-white">
    <!-- Sidebar (desktop) -->
    <aside
      class="hidden lg:flex flex-col bg-card border-r p-3 transition-all duration-300 ease-in-out"
      :class="sidebarWidth"
    >
      <!-- Logo & Collapse Button -->
      <div class="flex items-center justify-between mb-6">
        <RouterLink to="/" class="flex items-center space-x-2">
          <img src="/src/assets/favicon.svg" width="24" height="24" />
          <span v-if="!collapsed" class="font-bold text-xl">MySite</span>
        </RouterLink>
        <Button
          variant="ghost"
          size="icon"
          class="ml-auto"
          @click="collapsed = !collapsed"
        >
          <component :is="collapsed ? ChevronRight : ChevronLeft" class="w-5 h-5" />
        </Button>
      </div>

      <!-- Navigation -->
      <nav class="space-y-1 flex-1 overflow-y-auto">
        <template v-for="(route, index) in routeList" :key="index">
          <Button
            v-if="!route.hidden && route.component"
            as-child
            variant="ghost"
            class="justify-start text-base w-full"
          >
            <router-link :to="route.href" class="flex items-center w-full">
              <component
                v-if="route.iconPrefix"
                :is="route.iconPrefix"
                class="mr-2 w-5 h-5"
              />
              <span v-if="!collapsed">{{ route.label }}</span>
              <component
                v-if="route.iconSuffix && !collapsed"
                :is="route.iconSuffix"
                class="ml-auto w-4 h-4"
              />
            </router-link>
          </Button>
          <Button
            v-else-if="!route.hidden"
            as-child
            variant="ghost"
            class="justify-start text-base w-full"
          >
            <a
              :href="route.href"
              target="_blank"
              class="flex items-center w-full"
            >
              <component
                v-if="route.iconPrefix"
                :is="route.iconPrefix"
                class="mr-2 w-5 h-5"
              />
              <span v-if="!collapsed">{{ route.label }}</span>
              <component
                v-if="route.iconSuffix && !collapsed"
                :is="route.iconSuffix"
                class="ml-auto w-4 h-4"
              />
            </a>
          </Button>
        </template>
      </nav>

      <!-- Footer -->
      <div v-if="!collapsed" class="mt-auto">
        <Separator class="my-2" />
        <ToggleTheme class="mb-2" />
        <Button as-child size="sm" variant="ghost" aria-label="Join Discord">
          <a
            href="https://discord.gg/rAvmwWYJC3"
            target="_blank"
            class="flex items-center space-x-2"
          >
            <DiscordIcon class="size-5" />
            <span>Discord</span>
          </a>
        </Button>
      </div>
    </aside>

    <!-- Mobile Sheet -->
    <div class="lg:hidden absolute top-4 left-4 z-50">
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Menu @click="isOpen = true" class="cursor-pointer" />
        </SheetTrigger>

        <SheetContent side="left" class="flex flex-col justify-between bg-card">
          <div>
            <SheetHeader class="mb-4 ml-4">
              <SheetTitle class="flex items-center">Menu</SheetTitle>
            </SheetHeader>

            <div class="flex flex-col gap-2">
              <template v-for="(route, index) in routeList" :key="index">
                <Button
                  v-if="!route.hidden && route.component"
                  as-child
                  variant="ghost"
                  class="justify-start text-base"
                >
                  <router-link :to="route.href">
                    <component
                      v-if="route.iconPrefix"
                      :is="route.iconPrefix"
                      class="mr-1 w-4 h-4"
                    />
                    {{ route.label }}
                    <component
                      v-if="route.iconSuffix"
                      :is="route.iconSuffix"
                      class="ml-1 w-4 h-4"
                    />
                  </router-link>
                </Button>
                <Button
                  v-else-if="!route.hidden"
                  as-child
                  variant="ghost"
                  class="justify-start text-base"
                >
                  <a :href="route.href" target="_blank">
                    <component
                      v-if="route.iconPrefix"
                      :is="route.iconPrefix"
                      class="mr-1 w-4 h-4"
                    />
                    {{ route.label }}
                    <component
                      v-if="route.iconSuffix"
                      :is="route.iconSuffix"
                      class="ml-1 w-4 h-4"
                    />
                  </a>
                </Button>
              </template>
            </div>
          </div>

          <SheetFooter class="flex-col justify-start items-start">
            <Separator class="mb-2" />
            <ToggleTheme />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}
.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}
</style>
