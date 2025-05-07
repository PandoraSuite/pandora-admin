import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type { APIKey, NewAPIKey } from '../types/apiKeys';

export const useAPIKeysStore = defineStore('apiKeys', () => {
  // --- STATE ---
  const error = ref<string | null>(null);
  const apiKeys = ref<APIKey>();
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const createAPIKey = async (payload: NewAPIKey) => {
    isLoading.value = true;
    const response = await repositories.apiKeys.createAPIKey(payload);
    if (response.success) {
      apiKeys.value = response.data as APIKey;
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  return {
    error,
    apiKeys,
    isLoading,
    createAPIKey,
  };
});
