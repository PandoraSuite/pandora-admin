// src/stores/useToastStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let idCounter = 0;

export const useToastStore = defineStore('toast', () => {
  // --- STATE ---
  const toasts = ref<Toast[]>([]);

  // --- GETTERS ---

  // ---ACTIONS ---
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
  ) => {
    const id = ++idCounter;
    toasts.value.push({ id, message, type });

    // Auto delete after 5 seconds
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 5000);
  };

  const closeToast = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return {
    toasts,
    showToast,
    closeToast,
  };
});
