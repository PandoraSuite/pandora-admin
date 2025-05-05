import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type { Client, ClientFilterParams, NewClient } from '../types/clients';

export const useClientsStore = defineStore('clients', () => {
  // --- STATE ---
  const clients = ref<Client[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // --- GETTERS ---

  // --- ACTIONS ---
  const getClients = async (params?: ClientFilterParams) => {
    isLoading.value = true;
    const response = await repositories.clients.getClients(params);
    if (response.success) {
      clients.value = response.data as Client[];
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const createClient = async (payload: NewClient) => {
    isLoading.value = true;
    const response = await repositories.clients.createClient(payload);
    if (response.success) {
      clients.value.push(response.data as Client);
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const getClientById = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.clients.getClientById(id);
    if (response.success) {
      const client = response.data as Client;
    } else {
      error.value = response.error;
    }
  };
  isLoading.value = false;

  return {
    clients,
    isLoading,
    error,
    getClients,
    createClient,
    getClientById,
  };
});
