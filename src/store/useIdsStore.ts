import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { EnvironmentService } from '../types/environments';
import type { ProjectServices } from '../types/projects';

export const useIdsStore = defineStore('ids', () => {
  // --- STATE ---
  const clientId = ref<number>();
  const serviceId = ref<number>();
  const projectId = ref<number>();
  const environmentId = ref<number>();

  const servicesForCards = ref<ProjectServices[] | EnvironmentService[]>([]);

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

  const setServicesForCards = (
    servicesList: ProjectServices[] | EnvironmentService[],
  ) => {
    servicesForCards.value = servicesList;
  };

  return {
    clientId,
    serviceId,
    projectId,
    environmentId,
    servicesForCards,
    setClientId,
    setServiceId,
    setProjectId,
    setEnvironmentId,
    setServicesForCards,
  };
});
