<template>
  <div class="navbar flex w-full flex-row justify-between bg-primary shadow-sm">
    <RouterLink
      to="/home"
      class="ml-6 flex flex-row items-center justify-center gap-3"
    >
      <img
        src="/assets/white-logo-only.svg"
        alt="Pandora Logo"
        class="h-[60px] w-[40px]"
      />
      <h1 class="text-2xl font-semibold text-white">Pandora</h1>
    </RouterLink>
    <div class="mr-6 flex flex-row gap-6">
      <button
        @click="logout()"
        class="cursor-pointer rounded-xl px-2 py-1 text-white hover:bg-tertiary"
      >
        <font-awesome-icon icon="right-from-bracket" class="text-white" />
        Log out
      </button>
      <button class="theme-btn btn-circle" @click="toggleTheme()">
        <font-awesome-icon :icon="iconClass" class="text-white" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { useAuthStore } from '@store/useAuthStore';
import { useThemeStore } from '@store/useToggleThemeStore';

const themeStore = useThemeStore();
const authStore = useAuthStore();
const router = useRouter();

const toggleTheme = (): void => {
  themeStore.toggleTheme();
};

const logout = async (): Promise<void> => {
  await authStore.logout();
  router.push('/login');
};

// Computed to get the current icon
const iconClass = computed<string[]>(() => ['fa', themeStore.themeIcon]);
</script>

<style scoped></style>
