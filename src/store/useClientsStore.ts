import { defineStore } from 'pinia';
import { ref } from 'vue';

import { repositories } from '@services/repositories';
import type {
  Client,
  ClientFilterParams,
  ClientProjects,
  NewClient,
  UpdateClient,
} from '../types/clients';

export const useClientsStore = defineStore('clients', () => {
  // --- STATE ---
  const error = ref<string | null>(null);
  const clients = ref<Client[]>([]);
  const isLoading = ref<boolean>(false);
  const clientProjects = ref<ClientProjects[]>([]);

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
      return response.success;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const getClientById = async (id: number) => {
    isLoading.value = true;
    const response = await repositories.clients.getClientById(id);
    if (response.success) {
      return response.data as Client;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const updateClient = async (id: number, payload: UpdateClient) => {
    isLoading.value = true;
    const response = await repositories.clients.updateClient(id, payload);
    if (response.success) {
      const index = clients.value.findIndex((client) => client.id === id);
      if (index !== -1) {
        clients.value[index] = { ...clients.value[index], ...payload };
      }
      return response.success;
    } else {
      error.value = response.error;
    }
  };

  const getClientProjects = async (id: number) => {
    isLoading.value = true;
    clientProjects.value = [];
    const response = await repositories.clients.getClientProjects(id);
    if (response.success) {
      clientProjects.value = response.data as ClientProjects[];
      return response.data as ClientProjects[];
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  return {
    clients,
    isLoading,
    error,
    clientProjects,
    getClients,
    createClient,
    getClientById,
    updateClient,
    getClientProjects,
  };
});
