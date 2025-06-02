<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="environment_name"
      :class="[environmentNameError ? 'text-error' : 'text']"
      >Name:</label
    >
    <input
      id="environment_name"
      v-model="environmentName"
      type="text"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full bg-background outline-1"
    />
    <p v-if="environmentNameError" class="text-sm text-error">
      {{ environmentNameError }}
    </p>

    <div class="divider"></div>

    <div class="flex flex-row items-center justify-between">
      <h2 class="my-2 font-bold">Add a Service to the Environment</h2>
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
          class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm hover:bg-error"
          @click="removeServiceSelection(j)"
        >
          X
        </button>
      </div>

      <div class="divider"></div>

      <label
        for="service_id"
        :class="[environmentServiceIdError ? 'text-error' : 'text']"
        >Service:</label
      >
      <select
        id="service_id"
        v-model="environmentServiceId"
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
      <p v-if="environmentServiceIdError" class="text-sm text-error">
        {{ environmentServiceIdError }}
      </p>
      <label
        for="services_max_requests"
        :class="[environmentServiceMaxRequestsError ? 'text-error' : 'text']"
        >Max Requests:</label
      >
      <input
        id="services_max_requests"
        v-model="environmentServiceMaxRequests"
        type="number"
        placeholder=""
        @input="clearErrors($event)"
        class="input w-full bg-background outline-1"
      />
      <p v-if="environmentServiceMaxRequestsError" class="text-sm text-error">
        {{ environmentServiceMaxRequestsError }}
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

import { useIdsStore } from '@store/useIdsStore';
import { useServicesStore } from '@store/useServicesStore';

const environmentName = ref<string>('');
const environmentNameError = ref<string | null>(null);
const environmentServiceId = ref<number | null>(null);
const environmentServiceIdError = ref<string | null>(null);
const environmentServiceMaxRequests = ref<number | null>(null);
const environmentServiceMaxRequestsError = ref<string | null>(null);
const clicked = ref<boolean>(false);
const selectedServices = ref<
  {
    id: number | null;
    max_request: number | null;
  }[]
>([]);

const serviceStore = useServicesStore();
const { services } = storeToRefs(serviceStore);
const idsStore = useIdsStore();
const { projectServices } = storeToRefs(idsStore);

function toggleSection() {
  clicked.value = !clicked.value;
}

// Computed property to filter available services based on selected services.
const availableServices = computed(() =>
  projectServices.value.filter(
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
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;

  if (!environmentServiceId.value || !environmentServiceMaxRequests.value) {
    environmentServiceIdError.value = 'Service is required';
    environmentServiceMaxRequestsError.value = 'Max Requests is required';
    return;
  }

  selectedServices.value.push({
    id: environmentServiceId.value,
    max_request: environmentServiceMaxRequests.value,
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
  environmentServiceId.value = null;
  environmentServiceMaxRequests.value = null;
}

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'environment_name':
      environmentNameError.value = null;
      break;
    case 'service_id':
      environmentServiceIdError.value = null;
      break;
    case 'services_max_requests':
      environmentServiceMaxRequestsError.value = null;
      break;
  }
}

function resetForm() {
  environmentName.value = '';
  environmentServiceId.value = null;
  environmentServiceMaxRequests.value = null;

  // Reset error messages.
  environmentNameError.value = null;
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;
}

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      name: string;
      project_id: number;
      services: {
        id: number;
        max_request: number;
      }[];
    },
  ): void;
}>();

function submitForm() {
  environmentNameError.value = null;
  const projectId = idsStore.projectId;

  if (!environmentName.value || !projectId) {
    environmentNameError.value = 'Name is required';
    return;
  }

  emit('submit', {
    name: environmentName.value,
    project_id: projectId,
    services: selectedServices.value.map((service) => ({
      id: service.id as number,
      max_request: service.max_request as number,
    })),
  });
  resetForm();
}

onMounted(() => {});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
