<script lang="ts" setup>
import { ref, computed } from "vue";

import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
mode.value = "dark";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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

import { Menu } from "lucide-vue-next";
import ToggleTheme from "./ToggleTheme.vue";
import DiscordIcon from "@/icons/DiscordIcon.vue";
import { SquareArrowOutUpRight } from "lucide-vue-next";
import { routeList } from "@/config";

const isOpen = ref<boolean>(false);
</script>

<template>
  <header
  :class="{
    'shadow-light': mode === 'light',
    'shadow-dark': mode === 'dark',
    'w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md': true,
  }"
  >
  <RouterLink to="/" class="font-bold text-lg flex items-center" >
    <img src="/src/assets/favicon.svg" width="24" height="24" class="ml-2 mr-2"/>
  </RouterLink>
<!-- Mobile -->
<div class="flex items-center lg:hidden">
  <Sheet v-model:open="isOpen">
    <SheetTrigger as-child>
      <Menu
      @click="isOpen = true"
      class="cursor-pointer"
      />
    </SheetTrigger>
    
    <SheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card" >
    <div>
      <SheetHeader class="mb-4 ml-4">
        <SheetTitle class="flex items-center">
          <router-link to="/" />
        </SheetTitle>
      </SheetHeader>
      
      <div class="flex flex-col gap-2">
        <template v-for="(route, index) in routeList">
          <Button v-if="!route.hidden && route.component" as-child variant="ghost" class="justify-start text-base" >
            <router-link :to="route.href">
              <component v-if="route.iconPrefix" :is="route.iconPrefix" class="mr-1 w-4 h-4" />
              {{ route.label }}
              <component v-if="route.iconSuffix" :is="route.iconSuffix" class="ml-1 w-4 h-4" />
            </router-link>
          </Button>
          <Button v-if="!route.hidden && !route.component" as-child variant="ghost" class="justify-start text-base" >
            <a :href="route.href" target="_blank">
              <component v-if="route.iconPrefix" :is="route.iconPrefix" class="mr-1 w-4 h-4" />
              {{ route.label }}
              <component v-if="route.iconSuffix" :is="route.iconSuffix" class="ml-1 w-4 h-4" />
            </a>
          </Button>
        </template>
      </div>
    </div>
    
    <SheetFooter class="flex-col sm:flex-col justify-start items-start">
      <Separator class="mb-2" />
      <ToggleTheme />
    </SheetFooter>
  </SheetContent>
</Sheet>
</div>

<!-- Desktop -->
<NavigationMenu class="hidden lg:block">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <template v-for="(route, index) in routeList">
          <Button v-if="!route.hidden && route.component" as-child variant="ghost" class="justify-start text-base" >
            <router-link :to="route.href">
              <component v-if="route.iconPrefix" :is="route.iconPrefix" class="mr-1 w-4 h-4" />
              {{ route.label }}
              <component v-if="route.iconSuffix" :is="route.iconSuffix" class="ml-1 w-4 h-4" />
            </router-link>
          </Button>
          <Button v-if="!route.hidden && !route.component" as-child variant="ghost" class="justify-start text-base" >
            <a :href="route.href" target="_blank">
              <component v-if="route.iconPrefix" :is="route.iconPrefix" class="mr-1 w-4 h-4" />
              {{ route.label }}
              <component v-if="route.iconSuffix" :is="route.iconSuffix" class="ml-1 w-4 h-4" />
            </a>
          </Button>
        </template>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

<div class="hidden lg:flex">
  <ToggleTheme />
  
  <Button as-child size="sm" variant="ghost" aria-label="Join our Discord community">
    <a aria-label="Join our Discord community" href="https://discord.gg/rAvmwWYJC3" target="_blank">
      <DiscordIcon class="size-5" />
    </a>
  </Button>
  
</div>
</header>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}
</style>
