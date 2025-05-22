import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ProjectServices } from '../types/projects';

export const useIdsStore = defineStore('ids', () => {
  // --- STATE ---
  const clientId = ref<number>();
  const serviceId = ref<number>();
  const projectId = ref<number>();
  const environmentId = ref<number>();

  const servicesForEnvironments = ref<ProjectServices[]>([]);

  // --- GETTERS ---

  // --- ACTIONS ---
  const setClientId = (id: number) => {
    clientId.value = id;
  };

  const setServiceId = (id: number) => {
    serviceId.value = id;
  };

  const setProjectId = (id: number) => {
    projectId.value = id;
  };

  const setEnvironmentId = (id: number) => {
    environmentId.value = id;
  };

  const setServicesForEnvironments = (servicesList: ProjectServices[]) => {
    servicesForEnvironments.value = servicesList;
  };

  return {
    clientId,
    serviceId,
    projectId,
    environmentId,
    servicesForEnvironments,
    setClientId,
    setServiceId,
    setProjectId,
    setEnvironmentId,
    setServicesForEnvironments,
  };
});
