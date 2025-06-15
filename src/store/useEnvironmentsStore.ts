import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type { APIKey } from '../types/apiKeys';
import type {
  Environment,
  NewEnvironment,
  NewEnvironmentService,
} from '../types/environments';

export const useEnvironmentsStore = defineStore('environments', () => {
  // --- STATE ---
  const error = ref<string | null>(null);
  const environments = ref<Environment[]>([]);
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const createEnvironment = async (payload: NewEnvironment) => {
    isLoading.value = true;
    const response = await repositories.environments.createEnvironment(payload);
    if (response.success) {
      environments.value.push(response.data as Environment);
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const getEnvironmentById = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.getEnvironmentById(id);
    if (response.success) {
      return response.data as Environment;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Retrives the API keys of an environment by its id.
  const getEnvironmentAPIKeys = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.getEnvironmentAPIKeys(id);
    if (response.success) {
      return response.data as APIKey[];
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Assigns a service to an environment by its id.
  const assignEnvironmentService = async (
    id: number,
    payload: NewEnvironmentService,
  ) => {
    isLoading.value = true;
    const response = await repositories.environments.assignEnvironmentService(
      id,
      payload,
    );
    if (response.success) {
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Deletes a service from an environment by its id.
  const deleteEnvironmentService = async (id: number, service_id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.deleteEnvironmentService(
      id,
      service_id,
    );
    if (response.success) {
      return response.success;
    } else {
      error.value = response.error;
    }
  };

  // Resets the quota of a service in an environment by its id.
  const resetServiceQuota = async (id: number, service_id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.resetServiceQuota(
      id,
      service_id,
    );
    if (response.success) {
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Deletes an environment by its id.
  const deleteEnvironment = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.deleteEnvironment(id);
    if (response.success) {
      environments.value = environments.value.filter((env) => env.id !== id);
      isLoading.value = false;

      return response.success;
    } else {
      error.value = response.error;
      isLoading.value = false;
    }
  };

  return {
    error,
    environments,
    isLoading,
    createEnvironment,
    getEnvironmentById,
    getEnvironmentAPIKeys,
    assignEnvironmentService,
    deleteEnvironmentService,
    resetServiceQuota,
    deleteEnvironment,
  };
});
