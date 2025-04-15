import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type {
  NewService,
  Service,
} from '@services/repositories/servicesRepository';

import { repositories } from '@services/repositories/repositoriesFactory';

const servicesRepository = repositories.services;

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([]);
  const isLoading = ref<boolean>(false);

  const getAllServices = async () => {
    isLoading.value = true;

    try {
      const response = await servicesRepository.getServices();
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
      const response = await servicesRepository.createService(payload);
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
