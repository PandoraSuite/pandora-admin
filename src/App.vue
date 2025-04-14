<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";

onMounted(() => {
  const currentTheme = localStorage.getItem("data-theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
