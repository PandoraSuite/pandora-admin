<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import Toast from '@components/Toast.vue';
import { loadTheme } from '@composables/theme';
import type { Theme } from '@enums/theme';

onMounted(() => {
  const theme: Theme = loadTheme();
  document.documentElement.setAttribute('data-theme', theme);
});
</script>

<template>
  <RouterView />
  <Toast />
</template>

<style scoped></style>
