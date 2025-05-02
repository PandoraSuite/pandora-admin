import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type {
  Client,
  ClientFilterParams,
  NewClient,
} from '@services/repositories/clientsRepository';
import { repositories } from '@services/repositories/repositoriesFactory';

export const useClientsStore = defineStore('clients', () => {
  // --- STATE ---
  const clients = ref<Client[]>([]);
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const getAllClients = async (params?: ClientFilterParams) => {
    isLoading.value = true;
    try {
      const response = await repositories.clients.getClients(params);
      clients.value = response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error getting clients: ${err.message}`);
      } else {
        throw new Error('Unexpected error while obtaining clients.');
      }
    } finally {
      isLoading.value = false;
    }
  };

  const createNewClient = async (payload: NewClient) => {
    isLoading.value = true;
    try {
      const response = await repositories.clients.createClient(payload);
      clients.value.push(response); // Update state if necessary
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error creating client: ${err.message}`);
      } else {
        throw new Error('Unexpected error while creating client');
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    clients,
    isLoading,
    getAllClients,
    createNewClient,
  };
});
