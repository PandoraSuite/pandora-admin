import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type { APIKey, NewAPIKey, UpdateAPIKey } from '../types/apiKeys';

export const useAPIKeysStore = defineStore('apiKeys', () => {
  // --- STATE ---
  const error = ref<string | null>(null);
  const apiKeys = ref<APIKey[]>([]);
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const createAPIKey = async (payload: NewAPIKey) => {
    isLoading.value = true;
    const response = await repositories.apiKeys.createAPIKey(payload);
    if (response.success) {
      apiKeys.value.push(response.data as APIKey);
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const updateAPIKey = async (id: number, payload: UpdateAPIKey) => {
    isLoading.value = true;
    const response = await repositories.apiKeys.updateAPIKey(id, payload);
    if (response.success) {
      const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
      if (index !== -1) {
        apiKeys.value[index] = { ...apiKeys.value[index], ...payload };
      }
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
    updateAPIKey,
  };
});
