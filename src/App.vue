<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

import { loadTheme } from '@composables/theme';
import type { Theme } from "@enums/theme";

onMounted(() => {
  const theme: Theme = loadTheme();
  document.documentElement.setAttribute("data-theme", theme);
});
</script>

<template>
  <Header  />
  <Sidebar />
  
  <RouterView />
</template>

<style scoped></style>
