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
      isLoading.value = false;
      return response.success;
    } else {
      error.value = response.error;
      isLoading.value = false;
    }
  };

  // Update an API Key by its id.
  const updateAPIKey = async (id: number, payload: UpdateAPIKey) => {
    isLoading.value = true;
    const response = await repositories.apiKeys.updateAPIKey(id, payload);
    if (response.success) {
      const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
      if (index !== -1) {
        apiKeys.value[index] = { ...apiKeys.value[index], ...payload };
      }
      isLoading.value = false;
      return response.success;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
  };

  // Deletes an API Keys from an environment by its id.
  const deleteAPIKey = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.apiKeys.deleteAPIKey(id);
    if (response.success) {
      const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
      if (index !== -1) {
        apiKeys.value.splice(index, 1);
      }
      isLoading.value = false;
      return response.success;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
  };

  // Reveals the protected key.
  const revealAPIKey = async (id: number, reauthAccessToken: string) => {
    isLoading.value = true;
    const response = await repositories.apiKeys.revealAPIKey(
      id,
      reauthAccessToken,
    );
    if (response.success) {
      isLoading.value = false;
      return response.data;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
  };

  return {
    error,
    apiKeys,
    isLoading,
    createAPIKey,
    updateAPIKey,
    deleteAPIKey,
    revealAPIKey,
  };
});
