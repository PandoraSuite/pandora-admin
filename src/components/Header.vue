<template>
  <div class="navbar flex w-full flex-row justify-between bg-primary shadow-sm">
    <RouterLink
      to="/#"
      class="ml-6 flex flex-row items-center justify-center gap-3"
    >
      <img
        src="/assets/white-logo-only.svg"
        alt="Pandora Logo"
        class="h-[60px] w-[40px]"
      />
      <h1 class="text-2xl font-semibold text-white">Pandora</h1>
    </RouterLink>
    <div class="mr-6 flex flex-row gap-6">
      <button
        class="cursor-pointer rounded-xl px-2 py-1 text-white hover:bg-tertiary"
      >
        Admin
      </button>
      <button class="theme-btn btn-circle" @click="toggleTheme()">
        <font-awesome-icon :icon="iconClass" class="text-white" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { useThemeStore } from '../store/modules/useToggleThemeStore';

const themeStore = useThemeStore();

const toggleTheme = (): void => {
  themeStore.toggleTheme();
};

// Computed to get the current icon
const iconClass = computed<string[]>(() => ['fa', themeStore.themeIcon]);
</script>

<style scoped></style>
