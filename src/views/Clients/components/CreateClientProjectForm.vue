<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="project_name"
      class="mr-auto"
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
    <label
      for="project_status"
      class="mr-auto"
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
          class="mr-auto"
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
        <span class="flex flex-row items-center justify-between">
          <label
            for="services_max_requests"
            class="mr-auto"
            :class="[projectServiceMaxRequestsError ? 'text-error' : 'text']"
            >Max Requests:</label
          >
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
          v-model="displayedProjectServiceMaxRequests"
          type="number"
          :placeholder="isUnlimited ? 'Unlimited' : ''"
          :disabled="isUnlimited"
          @input="clearErrors($event)"
          class="input w-full bg-background outline-1"
        />
        <p v-if="projectServiceMaxRequestsError" class="text-sm text-error">
          {{ projectServiceMaxRequestsError }}
        </p>
        <label
          for="service_reset_frequency"
          class="mr-auto"
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
import { useIdsStore } from '@store/useIdsStore';
import { useServicesStore } from '@store/useServicesStore';

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
const toggleForm = ref<boolean>(false);
const isUnlimited = ref<boolean>(false);
const selectedServices = ref<
  {
    id: number | null;
    max_request: number | null;
    reset_frequency: string;
  }[]
>([]);

const idsStore = useIdsStore();
const { clientId } = storeToRefs(idsStore);
const serviceStore = useServicesStore();
const { services } = storeToRefs(serviceStore);

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

  let isValid = true; // Flag to control if all validations pass.

  if (!projectServiceId.value) {
    projectServiceIdError.value = 'Service is required';
    isValid = false;
  }

  if (!projectServiceMaxRequests.value) {
    projectServiceMaxRequestsError.value = 'Max Requests is required';
    isValid = false;
  }

  if (!projectServiceResetFrequency.value) {
    projectServiceResetFrequencyError.value = 'Reset Frequency is required';
    isValid = false;
  }

  if (!isValid) {
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
  isUnlimited.value = false;
}

// Computed property to handle the display of max requests input.
const displayedProjectServiceMaxRequests = computed({
  get() {
    // Case 1: If it is unlimited, we always want the input to be empty to display the placeholder.
    if (isUnlimited.value) {
      return '';
    }
    // Case 2: If it's NOT unlimited, but the underlying value is 0 or null, we also want the input to be visually empty to display the placeholder. This is crucial for inputs with type="number" where 0 is displayed as "0".
    if (
      projectServiceMaxRequests.value === null ||
      projectServiceMaxRequests.value === 0
    ) {
      return '';
    }
    // Case 3: In any other case (it is a positive number other than 0), we show the actual numerical value.
    return projectServiceMaxRequests.value;
  },
  set(newValue: string | null) {
    // If the user deletes all the content of the input (newValue will be an empty string '') or if null is assigned directly, we reset the underlying value to null.
    if (newValue === '' || newValue === null) {
      projectServiceMaxRequests.value = null;
    } else {
      const numValue = Number(newValue);
      // We ensure that the result of the conversion is a valid number (not NaN). `type="number"` in HTML already helps prevent non-numeric input.
      if (!isNaN(numValue)) {
        projectServiceMaxRequests.value = numValue;
      }
    }
  },
});

// Handle the toggle checkbox for unlimited requests.
function handleUnlimitedToggle() {
  if (isUnlimited.value) {
    projectServiceMaxRequests.value = -1; // Set to -1 to indicate unlimited requests.
  } else {
    projectServiceMaxRequests.value = null; // Reset to null when not unlimited.
  }
}

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
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
      isUnlimited.value = false;
      break;
    case 'service_reset_frequency':
      projectServiceResetFrequencyError.value = null;
      break;
  }
}

function resetForm() {
  projectName.value = '';
  projectStatus.value = '';
  projectServiceId.value = null;
  projectServiceMaxRequests.value = null;
  projectServiceResetFrequency.value = '';

  selectedServices.value = [];
  clicked.value = false;
  isUnlimited.value = false;

  // Reset error messages.
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
        max_requests: number;
        reset_frequency: string;
      }[];
      status: string;
    },
  ): void;
}>();

function submitForm() {
  projectNameError.value = null;
  projectStatusError.value = null;

  let isValid = true; // Flag to control if all validations pass.

  if (!projectName.value) {
    projectNameError.value = 'Name is required';
    isValid = false;
  }

  if (!projectStatus.value) {
    projectStatusError.value = 'Status is required';
    isValid = false;
  }

  if (isValid === false) {
    return;
  }

  if (clientId.value === null) {
    return;
  }

  emit('submit', {
    client_id: clientId.value,
    name: projectName.value,
    services: selectedServices.value.map((service) => ({
      id: service.id as number,
      max_requests: service.max_request as number,
      reset_frequency: service.reset_frequency,
    })),
    status: projectStatus.value,
  });
  resetForm();
}

onMounted(() => {
  serviceStore.getServices();
});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
