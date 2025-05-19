<template>
  <div
    class="toast-end toast z-50 h-fit max-w-[10%] overflow-y-auto"
  >
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="alert flex flex-row content-center pr-4"
      :class="{
        'alert-success': toast.type === 'success',
        'alert-error': toast.type === 'error',
        'alert-info': toast.type === 'info',
      }"
    >
      <span class="text-white">{{ toast.message }}</span>
      <button
        @click="toastStore.closeToast(toast.id)"
        class="cursor-pointer text-sm font-bold text-white"
        aria-label="Close"
      >
        X
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@store/useToastStore';

const toastStore = useToastStore();
</script>

<style scoped></style>
