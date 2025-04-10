<template>
  <section class="flex flex-col">
    <Header />
    <main class="flex flex-row ">
      <Sidebar />
      <RouterView class="main-view w-[90%] pt-3 px-3"></RouterView>
    </main>
  </section>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
</script>

<style scoped></style>
