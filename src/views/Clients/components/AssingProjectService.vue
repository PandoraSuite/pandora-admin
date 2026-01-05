<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="project_service_id"
      :class="[projectServiceIdError ? 'text-error' : 'text']"
      >Service:</label
    >
    <select
      id="project_service_id"
      v-model="projectServiceId"
      placeholder=""
      @input="clearErrors($event)"
      class="select w-full bg-background outline-1"
    >
      <option
        v-if="availableServices.length === 0"
        :value="null"
        selected
        class="text-text"
      >
        Probably you have assigned all available services to your project.
        Please create a new service.
      </option>
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
        for="project_services_max_requests"
        :class="[projectServiceMaxRequestsError ? 'text-error' : 'text']"
        >Max Requests:</label
      >
      <span class="flex flex-row items-center gap-2">
        <label for="project_services_unlimited_requests">Unlimited</label>
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
          id="project_services_unlimited_requests"
          type="checkbox"
          v-model="isUnlimited"
          class="checkbox my-auto checkbox-sm"
          @input="clearErrors($event)"
          @change="handleUnlimitedToggle"
        />
      </span>
    </span>
    <input
      id="project_services_max_requests"
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
      for="project_service_reset_frequency"
      :class="[projectServiceResetFrequencyError ? 'text-error' : 'text']"
      >Reset Frequency:</label
    >
    <select
      id="project_service_reset_frequency"
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

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { ResetServiceFrequencyLabels } from '@enums/resetServiceFrequency';
import { useProjectsStore } from '@store/useProjectsStore';
import { useServicesStore } from '@store/useServicesStore';

const projectServiceId = ref<number | null>(null);
const projectServiceIdError = ref<string | null>(null);
const projectServiceMaxRequests = ref<number | null>(null);
const projectServiceMaxRequestsError = ref<string | null>(null);
const projectServiceResetFrequency = ref<string | null>(null);
const projectServiceResetFrequencyError = ref<string | null>(null);
const isUnlimited = ref<boolean>(false);
const currentProjectId = ref<number>();
const selectedServices = ref<
  {
    id: number | null;
    max_requests: number | null;
    reset_frequency: string | null;
  }[]
>([]);

const serviceStore = useServicesStore();
const { services } = storeToRefs(serviceStore);
const projectStore = useProjectsStore();

const route = useRoute();

// Computed property to filter available services based on selected services.
const availableServices = computed(() =>
  services.value.filter(
    (service) => !selectedServices.value.some((s) => s.id === service.id),
  ),
);

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
    case 'project_service_id':
      projectServiceIdError.value = null;
      break;
    case 'project_services_max_requests':
      projectServiceMaxRequestsError.value = null;
      isUnlimited.value = false; // Reset unlimited state when the user interacts with the input.
      break;
    case 'project_service_reset_frequency':
      projectServiceResetFrequencyError.value = null;
      break;
  }
}

function resetForm() {
  projectServiceId.value = null;
  projectServiceMaxRequests.value = null;
  projectServiceResetFrequency.value = null;
  isUnlimited.value = false;

  // Reset error messages.
  projectServiceIdError.value = null;
  projectServiceMaxRequestsError.value = null;
  projectServiceResetFrequencyError.value = null;
}

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      id: number;
      max_requests: number;
      reset_frequency: string;
    },
  ): void;
}>();

function submitForm() {
  projectServiceIdError.value = null;
  projectServiceMaxRequestsError.value = null;
  projectServiceResetFrequencyError.value = null;

  let isValid = true;

  if (!projectServiceId.value) {
    projectServiceIdError.value = 'Service is required';
    isValid = false;
  }

  if (!projectServiceMaxRequests.value) {
    projectServiceMaxRequestsError.value = 'Max requests is required';
    isValid = false;
  }

  if (!projectServiceResetFrequency.value) {
    projectServiceResetFrequencyError.value = 'Reset frequency is required';
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  selectedServices.value.push({
    id: projectServiceId.value,
    max_requests: projectServiceMaxRequests.value,
    reset_frequency: projectServiceResetFrequency.value,
  });

  emit('submit', {
    id: projectServiceId.value ?? 0, // Default to 0 if null,
    max_requests: projectServiceMaxRequests.value ?? 0, // Default to 0 if null
    reset_frequency: projectServiceResetFrequency.value ?? '', // Default to empty string if null
  });
  resetForm();
}

onMounted(async () => {
  selectedServices.value = [];
  serviceStore.getServices();
  currentProjectId.value = Number(route.params.project_id);
  // We validate which services are already assigned to the project with their ID and remove them from the list of available services.
  const previousAssigned = await projectStore.getProjectById(
    currentProjectId.value || 0,
  );
  selectedServices.value.push(
    ...(previousAssigned?.services || []).map((service) => ({
      id: service.id,
      max_requests: service.max_requests,
      reset_frequency: service.reset_frequency,
    })),
  );
});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
