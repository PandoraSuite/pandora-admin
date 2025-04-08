<script setup lang="ts">
import Navbar from './components/Navbar.vue';

const toggleTheme = () => {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  htmlElement.setAttribute("data-theme", newTheme);
};
</script>

<template>
  <!-- <Navbar /> -->
  <router-view />
  <h1 class="text">Hello Pandora</h1>

  <div class="text-text p-4 rounded">
    <h1 class="text-text">Título</h1>
    <p class="text-text">Contenido del párrafo.</p>
    <button class="bg-secondary text-text p-2 rounded" @click="toggleTheme">
      Cambiar Tema
    </button>
  </div>
</template>

<style scoped></style>
