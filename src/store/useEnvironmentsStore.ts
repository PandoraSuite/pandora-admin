import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type { APIKey } from '../types/apiKeys';
import type {
  Environment,
  NewEnvironment,
  NewEnvironmentService,
  UpdateEnvironmentName,
  UpdateEnvironmentServices,
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
      isLoading.value = false;
      return response.success;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
  };

  const getEnvironmentById = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.getEnvironmentById(id);
    if (response.success) {
      isLoading.value = false;
      return response.data as Environment;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
  };

  // Retrives the API keys of an environment by its id.
  const getEnvironmentAPIKeys = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.getEnvironmentAPIKeys(id);
    if (response.success) {
      isLoading.value = false;
      return response.data as APIKey[];
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
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
      isLoading.value = false;
      return response.success;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
  };

  // Deletes a service from an environment by its id.
  const deleteEnvironmentService = async (id: number, service_id: number) => {
    isLoading.value = true;
    const response = await repositories.environments.deleteEnvironmentService(
      id,
      service_id,
    );
    if (response.success) {
      isLoading.value = false;
      return response.success;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
  };

  // Resets the quota of a service in an environment by its id.
  const resetServiceQuota = async (
    environment_id: number,
    service_id: number,
  ) => {
    isLoading.value = true;
    const response = await repositories.environments.resetServiceQuota(
      environment_id,
      service_id,
    );
    if (response.success) {
      isLoading.value = false;
      return response.success;
    } else {
      isLoading.value = false;
      error.value = response.error;
    }
    isLoading.value = false;
  };

  // Updates an environment by its id.
  const updateEnvironment = async (
    id: number,
    payload: UpdateEnvironmentName,
  ) => {
    isLoading.value = true;
    const response = await repositories.environments.updateEnvironment(
      id,
      payload,
    );
    if (response.success) {
      const index = environments.value.findIndex((env) => env.id === id);
      if (index !== -1) {
        environments.value[index] = {
          ...environments.value[index],
          ...payload,
        };
      }
      isLoading.value = false;
      return response.success;
    } else {
      error.value = response.error;
      isLoading.value = false;
    }
  };

  // Update services assigned to a project.
  const updateEnvironmentService = async (
    environment_id: number,
    service_id: number,
    payload: UpdateEnvironmentServices,
  ) => {
    isLoading.value = true;
    const response = await repositories.environments.updateEnvironmentService(
      environment_id,
      service_id,
      payload,
    );
    if (response.success) {
      const index = environments.value.findIndex(
        (environment) => environment.id === environment_id,
      );
      if (index !== -1) {
        const serviceIndex = environments.value[index].services.findIndex(
          (service) => service.id === service_id,
        );
        if (serviceIndex !== -1) {
          environments.value[index].services[serviceIndex] = {
            ...environments.value[index].services[serviceIndex],
            ...payload,
          };
        }
      }
      isLoading.value = false;
      return response.success;
    } else {
      error.value = response.error;
      isLoading.value = false;
    }
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
    updateEnvironment,
    updateEnvironmentService,
    deleteEnvironment,
  };
});
