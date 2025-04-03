<template>
  <div
    class="navbar bg-primary shadow-sm w-screen flex flex-row justify-between"
  >
    <div class="flex flex-row gap-5 ml-6">
      <h1 class="text-2xl text-white mx-3.5 font-semibold">Pandora</h1>
    </div>
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
import { useThemeStore } from "../stores/toggleTheme";

const themeStore = useThemeStore();

const toggleTheme = (): void => {
  themeStore.toggleTheme();
};

// Computed para obtener el icono actual
const iconClass = computed<string[]>(() => ['fa', themeStore.icon]);
</script>

<style scoped></style>
