import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIdsStore = defineStore('ids', () => {
  // --- STATE ---
  const clientId = ref<number>();
  const serviceId = ref<number>();
  const projectId = ref<number>();
  const environmentId = ref<number>();

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

  return {
    clientId,
    serviceId,
    projectId,
    environmentId,
    setClientId,
    setServiceId,
    setProjectId,
    setEnvironmentId,
  };
});
