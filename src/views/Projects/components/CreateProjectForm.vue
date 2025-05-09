<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="project_name"
      :class="[projectNameError ? 'text-error' : 'text']"
      >Name:</label
    >
    <input
      id="project_name"
      v-model="projectName"
      type="text"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full bg-background outline-1"
    />
    <p v-if="projectNameError" class="text-sm text-error">
      {{ projectNameError }}
    </p>
    <label for="client_id" :class="[projectNameError ? 'text-error' : 'text']"
      >Client:</label
    >
    <select
      id="client_id"
      v-model="clientId"
      placeholder=""
      @input="clearErrors($event)"
      class="select w-full bg-background outline-1"
    >
      <option v-for="client in clients" :key="client.id" :value="client.id">
        {{ client.name }}
      </option>
    </select>
    <p v-if="clientIdError" class="text-sm text-error">
      {{ clientIdError }}
    </p>
    <label
      for="project_status"
      :class="[projectNameError ? 'text-error' : 'text']"
      >Status:</label
    >
    <select
      id="project_status"
      v-model="projectStatus"
      placeholder=""
      @input="clearErrors($event)"
      class="select w-full bg-background outline-1"
    >
      <option
        v-for="(statusLabel, statusValue, i) in ProjectStatusLabels"
        :key="i"
        :value="statusValue"
      >
        {{ statusLabel }}
      </option>
    </select>
    <p v-if="projectStatusError" class="text-sm text-error">
      {{ projectStatusError }}
    </p>

    <div class="divider"></div>

    <div class="flex flex-row items-center justify-between">
      <h2 class="my-2 font-bold">Add a Service to the Project</h2>
      <span>
        <p
          v-if="!clicked"
          @click="toggleSection()"
          class="cursor-pointer text-xl font-bold"
        >
          +
        </p>
      </span>
    </div>
    <div
      v-if="clicked"
      class="flex flex-col gap-4 transition-discrete ease-in-out"
    >
      <h4 v-if="selectedServices.length > 0">Selected Services:</h4>
      <div
        v-for="(service, j) in selectedServices"
        :key="j"
        class="card mb-4 flex flex-row rounded-lg border p-4"
      >
        <p class="font-semibold">
          {{ getServiceName(service.id) }} -
          {{ getServiceVersion(service.id) }}
        </p>
        <button
          class="btn absolute top-2 right-2 btn-circle text-white btn-ghost btn-sm hover:bg-error"
          @click="removeServiceSelection(j)"
        >
          X
        </button>
      </div>

      <div class="divider"></div>

      <label
        for="service_id"
        :class="[projectServiceIdError ? 'text-error' : 'text']"
        >Service:</label
      >
      <select
        id="service_id"
        v-model="projectServiceId"
        placeholder=""
        @input="clearErrors($event)"
        class="select w-full bg-background outline-1"
      >
        <option
          v-for="service in availableServices"
          :key="service.id"
          :value="service.id"
        >
          {{ service.name }}
        </option>
      </select>
      <p v-if="projectServiceIdError" class="text-sm text-error">
        {{ projectServiceIdError }}
      </p>
      <label
        for="services_max_requests"
        :class="[projectServiceMaxRequestsError ? 'text-error' : 'text']"
        >Max Requests:</label
      >
      <input
        id="services_max_requests"
        v-model="projectServiceMaxRequests"
        type="number"
        placeholder=""
        @input="clearErrors($event)"
        class="input w-full bg-background outline-1"
      />
      <p v-if="projectServiceMaxRequestsError" class="text-sm text-error">
        {{ projectServiceMaxRequestsError }}
      </p>
      <label
        for="service_reset_frequency"
        :class="[projectServiceResetFrequencyError ? 'text-error' : 'text']"
        >Reset Frequency:</label
      >
      <select
        id="service_reset_frequency"
        v-model="projectServiceResetFrequency"
        placeholder=""
        @input="clearErrors($event)"
        class="select w-full bg-background outline-1"
      >
        <option
          v-for="(
            frequenceLabel, frequenceValue, k
          ) in ResetServiceFrequencyLabels"
          :key="k"
          :value="frequenceValue"
        >
          {{ frequenceLabel }}
        </option>
      </select>
      <p v-if="projectServiceResetFrequencyError" class="text-sm text-error">
        {{ projectServiceResetFrequencyError }}
      </p>

      <button
        type="button"
        class="btn mx-auto mb-4 w-fit bg-accent text-white"
        @click="addServiceSelection"
      >
        Add Service
      </button>
      <div class="divider"></div>
    </div>

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

import { ProjectStatusLabels } from '@enums/projectStatus';
import { ResetServiceFrequencyLabels } from '@enums/resetServiceFrequency';
import { useClientsStore } from '@store/useClientsStore';
import { useServicesStore } from '@store/useServicesStore';

const clientId = ref<number | null>(null);
const clientIdError = ref<string | null>(null);
const projectName = ref<string>('');
const projectNameError = ref<string | null>(null);
const projectStatus = ref<string>('');
const projectStatusError = ref<string | null>(null);
const projectServiceId = ref<number | null>(null);
const projectServiceIdError = ref<string | null>(null);
const projectServiceMaxRequests = ref<number | null>(null);
const projectServiceMaxRequestsError = ref<string | null>(null);
const projectServiceResetFrequency = ref<string>('');
const projectServiceResetFrequencyError = ref<string | null>(null);
const clicked = ref<boolean>(false);
const selectedServices = ref<
  {
    id: number | null;
    max_request: number | null;
    reset_frequency: string;
  }[]
>([]);

const clientStore = useClientsStore();
const { clients } = storeToRefs(clientStore);
const serviceStore = useServicesStore();
const { services } = storeToRefs(serviceStore);

function toggleSection() {
  clicked.value = !clicked.value;
}

// Computed property to filter available services based on selected services.
const availableServices = computed(() =>
  services.value.filter(
    (service) => !selectedServices.value.some((s) => s.id === service.id),
  ),
);

// Utility functions to display name.
function getServiceName(id: number | null): string {
  const service = services.value.find((s) => s.id === id);
  return service ? service.name : 'Unknown';
}

// Utility functions to display version.
function getServiceVersion(id: number | null): string {
  const service = services.value.find((s) => s.id === id);
  return service ? service.version : '';
}

// Add service to the list of selected services.
function addServiceSelection() {
  projectServiceIdError.value = null;
  projectServiceMaxRequestsError.value = null;
  projectServiceResetFrequencyError.value = null;

  if (
    !projectServiceId.value ||
    !projectServiceMaxRequests.value ||
    !projectServiceResetFrequency.value
  ) {
    projectServiceIdError.value = 'Service is required';
    projectServiceMaxRequestsError.value = 'Max Requests is required';
    projectServiceResetFrequencyError.value = 'Reset Frequency is required';
    return;
  }

  selectedServices.value.push({
    id: projectServiceId.value,
    max_request: projectServiceMaxRequests.value,
    reset_frequency: projectServiceResetFrequency.value,
  });

  // Reset input values ​​after adding the service.
  resetServiceSelection();
}

// Remove service from the list of selected services.
function removeServiceSelection(index: number) {
  selectedServices.value.splice(index, 1);
}

// Reset the values ​​of the service inputs to make a new selection.
function resetServiceSelection() {
  projectServiceId.value = null;
  projectServiceMaxRequests.value = null;
  projectServiceResetFrequency.value = '';
}

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'client_id':
      clientIdError.value = null;
      break;
    case 'project_name':
      projectNameError.value = null;
      break;
    case 'project_status':
      projectStatusError.value = null;
      break;
    case 'service_id':
      projectServiceIdError.value = null;
      break;
    case 'services_max_requests':
      projectServiceMaxRequestsError.value = null;
      break;
    case 'service_reset_frequency':
      projectServiceResetFrequencyError.value = null;
      break;
  }
}

function resetForm() {
  clientId.value = null;
  projectName.value = '';
  projectStatus.value = '';
  projectServiceId.value = null;
  projectServiceMaxRequests.value = null;
  projectServiceResetFrequency.value = '';

  // Reset error messages.
  clientIdError.value = null;
  projectNameError.value = null;
  projectStatusError.value = null;
  projectServiceIdError.value = null;
  projectServiceMaxRequestsError.value = null;
  projectServiceResetFrequencyError.value = null;
}

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      client_id: number;
      name: string;
      services: {
        id: number;
        max_request: number;
        reset_frequency: string;
      }[];
      status: string;
    },
  ): void;
}>();

function submitForm() {
  clientIdError.value = null;
  projectNameError.value = null;
  projectStatusError.value = null;

  if (!clientId.value || !projectName.value || !projectStatus.value) {
    clientIdError.value = 'Client is required';
    projectNameError.value = 'Name is required';
    projectStatusError.value = 'Status is required';
    return;
  }

  emit('submit', {
    client_id: clientId.value,
    name: projectName.value,
    services: selectedServices.value.map((service) => ({
      id: service.id as number,
      max_request: service.max_request as number,
      reset_frequency: service.reset_frequency,
    })),
    status: projectStatus.value,
  });
  resetForm();
}

onMounted(() => {
  clientStore.getClients();
  serviceStore.getServices();
});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped>
select,
::picker(select) {
  appearance: base;
}

option {
  background: var(--color-background);
  &:hover {
    background: var(--color-tertiary);
  }
  &:checked {
    background: var(--color-tertiary);
  }
}
</style>
