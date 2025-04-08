<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

onMounted(() => {
  const currentTheme = localStorage.getItem("data-theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
});
</script>

<template>
  <Header  />
  <Sidebar />
  
  <RouterView />
</template>

<style scoped></style>
