<script setup lang="ts">
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

onMounted(() => {
  const currentTheme = localStorage.getItem("data-theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
});
</script>

<template>
  <Navbar  />
  <Sidebar />
  
  <slot></slot>
</template>

<style scoped></style>
