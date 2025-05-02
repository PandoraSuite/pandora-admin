import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories/repositoriesFactory';
import type {
  NewService,
  Service,
  ServiceFilterParams,
} from '@services/repositories/servicesRepository';

export const useServicesStore = defineStore('services', () => {
  // --- STATE ---
  const services = ref<Service[]>([]);
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const getAllServices = async (params?: ServiceFilterParams) => {
    isLoading.value = true;
    try {
      const response = await repositories.services.getServices(params);
      services.value = response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error getting services: ${err.message}`);
      } else {
        throw new Error('Unexpected error while obtaining services.');
      }
    } finally {
      isLoading.value = false;
    }
  };

  const createNewService = async (payload: NewService) => {
    isLoading.value = true;
    try {
      const response = await repositories.services.createService(payload);
      services.value.push(response); // Update state if necessary
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error creating service: ${err.message}`);
      } else {
        throw new Error('Unexpected error while creating service');
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    services,
    isLoading,
    getAllServices,
    createNewService,
  };
});
