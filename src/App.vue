<script setup lang="ts">
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";

onMounted(() => {
  const currentTheme = localStorage.getItem("data-theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
});
</script>

<template>
  <Navbar  />
  
  <h1 class="text">Hello Pandora</h1>

  <div class="text-text p-4 rounded">
    <h1 class="text-text">Título</h1>
    <p class="text-text">Contenido del párrafo.</p>
  </div>
</template>

<style scoped></style>
