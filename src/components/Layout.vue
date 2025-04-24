<template>
  <section class="flex h-screen flex-col">
    <Header />
    <main class="flex h-full flex-row">
      <Sidebar />
      <RouterView class="main-view w-[90%] px-5 pt-5"></RouterView>
    </main>
  </section>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
</script>

<style scoped></style>
