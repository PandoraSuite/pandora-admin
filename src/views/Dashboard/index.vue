<template>
  <div class="mb-8 flex h-full w-full flex-col gap-y-4 px-2">
    <Breadcrumbs />
    <div class="divider"></div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from '@components/Breadcrumbs.vue';

</script>

<style scoped></style>
