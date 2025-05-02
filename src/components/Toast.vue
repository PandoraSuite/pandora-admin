<template>
  <div class="toast-end toast z-50">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="alert pr-4 content-center flex flex-row"
      :class="{
        'alert-success': toast.type === 'success',
        'alert-error': toast.type === 'error',
        'alert-info': toast.type === 'info',
      }"
    >
      <span class="text-white">{{ toast.message }}</span>
      <button
        @click="toastStore.closeToast(toast.id)"
        class="text-sm text-white font-bold cursor-pointer"
        aria-label="Close"
      >
        X
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@store/modules/useToastStore';

const toastStore = useToastStore();
</script>

<style scoped></style>
