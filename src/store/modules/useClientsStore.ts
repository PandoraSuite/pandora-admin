import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories/repositoriesFactory';
import type {
    Client,
} from '@services/repositories/clientsRepository';

export const useClientsStore = defineStore('clients', () => {
  // --- STATE ---
  const clients = ref<Client[]>([]);
  const isLoading = ref<boolean>(false);

  // --- GETTERS ---

  // --- ACTIONS ---
  const getAllClients = async () => {
    isLoading.value = true;
    try {
      const response = await repositories.clients.getClients();
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

  return {
    clients,
    isLoading,
    getAllClients,
  };
});
