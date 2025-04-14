<template>
  <div
    class="navbar bg-primary shadow-sm w-full flex flex-row justify-between"
  >
    <RouterLink to="/#" class="flex flex-row gap-3 ml-6 justify-center items-center">
      <img src="/assets/white-logo-only.svg" alt="Pandora Logo" class="w-[40px] h-[60px]">
      <h1 class="text-2xl text-white font-semibold">Pandora</h1>
    </RouterLink>
    <div class="flex flex-row mr-6 gap-6">
      <button class="cursor-pointer hover:bg-tertiary py-1 px-2 rounded-xl text-white">Admin</button>
      <button class="theme-btn btn-circle" @click="toggleTheme()">
        <font-awesome-icon :icon="iconClass" class="text-white" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import { useThemeStore } from "../store/modules/useToggleThemeStore";

const themeStore = useThemeStore();

const toggleTheme = (): void => { themeStore.toggleTheme() };

// Computed to get the current icon
const iconClass = computed<string[]>(() => ['fa', themeStore.themeIcon]);
</script>

<style scoped></style>
