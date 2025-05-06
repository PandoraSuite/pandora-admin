import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type {
  NewService,
  Service,
  ServiceFilterParams,
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

  return {
    error,
    services,
    isLoading,
    getServices,
    createNewService,
  };
});
