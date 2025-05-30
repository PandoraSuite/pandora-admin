import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { EnvironmentService } from '../types/environments';
import type { ProjectServices } from '../types/projects';

export const useIdsStore = defineStore('ids', () => {
  // --- STATE ---
  const clientId = ref<number | null>(null);
  const serviceId = ref<number | null>(null);
  const projectId = ref<number | null>(null);
  const environmentId = ref<number | null>(null);

  const projectServices = ref<ProjectServices[]>([]);
  const environmentsServices = ref<EnvironmentService[]>([]);

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

  const clearClientId = () => {
    clientId.value = null;
  };

  const clearServiceId = () => {
    serviceId.value = null;
  };

  const clearProjectId = () => {
    projectId.value = null;
  };

  const clearEnvironmentId = () => {
    environmentId.value = null;
  };

  const setProjectServices = (
    servicesList: ProjectServices[],
  ) => {
    projectServices.value = servicesList;
  };

  const setEnvironmentServices = (
    servicesList: EnvironmentService[],
  ) => {
    environmentsServices.value = servicesList;
  };

  return {
    clientId,
    serviceId,
    projectId,
    environmentId,
    projectServices,
    environmentsServices,
    setClientId,
    setServiceId,
    setProjectId,
    setEnvironmentId,
    clearClientId,
    clearServiceId,
    clearProjectId,
    clearEnvironmentId,
    setProjectServices,
    setEnvironmentServices,
  };
});
