<script setup lang="ts">
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { RouterView } from "vue-router";

onMounted(() => {
  const currentTheme = localStorage.getItem("data-theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
});
</script>

<template>
  <Navbar  />
  <Sidebar />
  
  <RouterView />
</template>

<style scoped></style>
