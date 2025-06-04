import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Service } from '../types/services';
import type { Client } from '../types/clients';
import type { Project } from '../types/projects';
import type { Environment } from '../types/environments';

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  // --- STATE ---
  const service = ref<Service | null>(null);
  const client = ref<Client | null>(null);
  const project = ref<Project | null>(null);
  const environment = ref<Environment | null>(null);

  // --- GETTERS ---

  // --- ACTIONS ---
  const setService = (data: Service) => {
    service.value = data;
  };

  const setClient = (data: Client) => {
    client.value = data;
  };

  const setProject = (data: Project) => {
    project.value = data;
  };

  const setEnvironment = (data: Environment) => {
    environment.value = data;
  };

  const clearAllState = () => {
    service.value = null;
    client.value = null;
    project.value = null;
    environment.value = null;
  }

  return {
    service,
    client,
    project,
    environment,
    setClient,
    setService,
    setProject,
    setEnvironment,
    clearAllState,
  };
});
