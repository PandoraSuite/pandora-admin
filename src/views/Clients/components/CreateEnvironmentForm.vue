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
          v-if="!clicked || (clicked && !toggleForm)"
          @click="showSection()"
          class="cursor-pointer text-xl font-bold"
        >
          +
        </p>
        <p
          v-if="toggleForm && clicked"
          @click="hideSection()"
          class="cursor-pointer text-xl font-bold"
        >
          -
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

      <div
        v-if="toggleForm"
        class="flex flex-col gap-4 transition-discrete ease-in-out"
      >
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
        <span class="flex flex-row items-center justify-between">
          <span class="flex flex-row items-center gap-2">
            <span
              class="tooltip tooltip-right flex btn-circle h-4 w-4 bg-quick-action object-center"
              data-tip="Consider the maximum of service requests and the total already assigned between environments."
            >
              <font-awesome-icon
                :icon="['fas', 'question']"
                class="mx-auto my-auto text-xs text-white"
              />
            </span>
            <label
              for="services_max_requests"
              :class="[
                environmentServiceMaxRequestsError ? 'text-error' : 'text',
              ]"
              >Max Requests:</label
            >
          </span>
          <span class="flex flex-row items-center gap-2">
            <label for="unlimited_requests">Unlimited</label>
            <span
              class="tooltip tooltip-left flex btn-circle h-4 w-4 bg-quick-action object-center"
              data-tip="If checked, the service will have unlimited requests."
            >
              <font-awesome-icon
                :icon="['fas', 'question']"
                class="mx-auto my-auto text-xs text-white"
              />
            </span>
            <input
              id="unlimited_requests"
              type="checkbox"
              v-model="isUnlimited"
              class="checkbox my-auto checkbox-sm"
              @input="clearErrors($event)"
              @change="handleUnlimitedToggle"
            />
          </span>
        </span>
        <input
          id="services_max_requests"
          v-model="displayedEnvironmentServiceMaxRequests"
          type="number"
          :placeholder="isUnlimited ? 'Unlimited' : ''"
          :disabled="isUnlimited"
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

const environmentName = ref<string>('');
const environmentNameError = ref<string | null>(null);
const environmentServiceId = ref<number | null>(null);
const environmentServiceIdError = ref<string | null>(null);
const environmentServiceMaxRequests = ref<number | null>(null);
const environmentServiceMaxRequestsError = ref<string | null>(null);
const clicked = ref<boolean>(false);
const toggleForm = ref<boolean>(false);
const isUnlimited = ref<boolean>(false);
const selectedServices = ref<
  {
    id: number | null;
    max_request: number | null;
  }[]
>([]);

const idsStore = useIdsStore();
const { projectServices } = storeToRefs(idsStore);

function showSection() {
  clicked.value = true;
  toggleForm.value = true;
}

function hideSection() {
  if (toggleForm.value && selectedServices.value.length > 0) {
    toggleForm.value = false;
  }
  if (selectedServices.value.length === 0) {
    clicked.value = false;
    toggleForm.value = false;
  }
}

// Computed property to filter available services based on selected services.
const availableServices = computed(() =>
  projectServices.value.filter(
    (service) => !selectedServices.value.some((s) => s.id === service.id),
  ),
);

// Utility functions to display name.
function getServiceName(id: number | null): string {
  const service = projectServices.value.find((s) => s.id === id);
  return service ? service.name : 'Unknown';
}

// Utility functions to display version.
function getServiceVersion(id: number | null): string {
  const service = projectServices.value.find((s) => s.id === id);
  return service ? service.version : '';
}

// Add service to the list of selected services.
function addServiceSelection() {
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;

  let isValid = true;

  if (!environmentServiceId.value) {
    environmentServiceIdError.value = 'Service is required';
    isValid = false;
  }

  if (!environmentServiceMaxRequests.value) {
    environmentServiceMaxRequestsError.value = 'Max Requests is required';
    isValid = false;
  }

  if (!isValid) {
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
  isUnlimited.value = false;
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
      isUnlimited.value = false; // Reset unlimited state when the user interacts with the input.
      break;
  }
}

function resetForm() {
  environmentName.value = '';
  environmentServiceId.value = null;
  environmentServiceMaxRequests.value = null;
  isUnlimited.value = false;

  resetServiceSelection();
  selectedServices.value = [];
  clicked.value = false;
  toggleForm.value = false;

  // Reset error messages.
  environmentNameError.value = null;
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;
}

// Computed property to handle the display of max requests input.
const displayedEnvironmentServiceMaxRequests = computed({
  get() {
    // Case 1: If it is unlimited, we always want the input to be empty to display the placeholder.
    if (isUnlimited.value) {
      return '';
    }
    // Case 2: If it's NOT unlimited, but the underlying value is 0 or null, we also want the input to be visually empty to display the placeholder. This is crucial for inputs with type="number" where 0 is displayed as "0".
    if (
      environmentServiceMaxRequests.value === null ||
      environmentServiceMaxRequests.value === 0
    ) {
      return '';
    }
    // Case 3: In any other case (it is a positive number other than 0), we show the actual numerical value.
    return environmentServiceMaxRequests.value;
  },
  set(newValue: string | null) {
    // If the user deletes all the content of the input (newValue will be an empty string '') or if null is assigned directly, we reset the underlying value to null.
    if (newValue === '' || newValue === null) {
      environmentServiceMaxRequests.value = null;
    } else {
      const numValue = Number(newValue);
      // We ensure that the result of the conversion is a valid number (not NaN). `type="number"` in HTML already helps prevent non-numeric input.
      if (!isNaN(numValue)) {
        environmentServiceMaxRequests.value = numValue;
      }
    }
  },
});

// Handle the toggle checkbox for unlimited requests.
function handleUnlimitedToggle() {
  if (isUnlimited.value) {
    environmentServiceMaxRequests.value = -1; // Set to -1 to indicate unlimited requests.
  } else {
    environmentServiceMaxRequests.value = null; // Reset to null when not unlimited.
  }
}

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      name: string;
      project_id: number;
      services: {
        id: number;
        max_requests: number;
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
      max_requests: service.max_request as number,
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
