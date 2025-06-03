import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type {
  NewService,
  Service,
  ServiceFilterParams,
  UpdateServiceStatus,
} from '../types/services';

export const useServicesStore = defineStore('services', () => {
  // --- STATE ---
  const error = ref<string | null>(null);
  const services = ref<Service[]>([]);
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const getServices = async (params?: ServiceFilterParams) => {
    isLoading.value = true;
    const response = await repositories.services.getServices(params);
    if (response.success) {
      services.value = response.data as Service[];
    } else {
      error.value = response.error;
    }

    isLoading.value = false;
  };

  const createNewService = async (payload: NewService) => {
    isLoading.value = true;
    const response = await repositories.services.createService(payload);
    if (response.success) {
      services.value.push(response.data as Service); // Update state if necessary
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const updateServiceStatus = async (
    id: number,
    payload: UpdateServiceStatus,
  ) => {
    isLoading.value = true;
    const response = await repositories.services.updateServiceStatus(
      id,
      payload,
    );
    if (response.success) {
      const index = services.value.findIndex((service) => service.id === id);
      if (index !== -1) {
        services.value[index] = { ...services.value[index], ...payload };
      }
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const deleteService = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.services.deleteService(id);
    if (response.success) {
      const index = services.value.findIndex((service) => service.id === id);
      if (index !== -1) {
        services.value.splice(index, 1);
      }
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  return {
    error,
    services,
    isLoading,
    getServices,
    createNewService,
    updateServiceStatus,
    deleteService,
  };
});
