<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
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
      <label
        for="services_max_requests"
        :class="[environmentServiceMaxRequestsError ? 'text-error' : 'text']"
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

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

import { useEnvironmentsStore } from '@store/useEnvironmentsStore';
import { useIdsStore } from '@store/useIdsStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useRoute } from 'vue-router';
import type { ProjectServices } from '../../../types/projects';

const environmentServiceId = ref<number | null>(null);
const environmentServiceIdError = ref<string | null>(null);
const environmentServiceMaxRequests = ref<number | null>(null);
const environmentServiceMaxRequestsError = ref<string | null>(null);
const isUnlimited = ref<boolean>(false);
const availableProjectServices = ref<ProjectServices[]>([]);
const currentProjectId = ref<number>();
const currentEnvironmentId = ref<number>();
const selectedServices = ref<
  {
    id: number | null;
    max_requests: number | null;
  }[]
>([]);

const idsStore = useIdsStore();
const { projectServices } = storeToRefs(idsStore);
const projectStore = useProjectsStore();
const environmentStore = useEnvironmentsStore();

const route = useRoute();

// Computed property to filter available services based on selected services.
const availableServices = computed(() =>
  projectServices.value.filter(
    (service) => !selectedServices.value.some((s) => s.id === service.id),
  ),
);

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

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
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
  environmentServiceId.value = null;
  environmentServiceMaxRequests.value = null;
  isUnlimited.value = false;

  // Reset error messages.
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;
}

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      id: number;
      max_requests: number;
    },
  ): void;
}>();

function submitForm() {
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;

  let isValid = true;

  if (!environmentServiceId.value) {
    environmentServiceIdError.value = 'Service is required';
    isValid = false;
  }

  if (!environmentServiceMaxRequests.value) {
    environmentServiceMaxRequestsError.value = 'Max request is required';
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  selectedServices.value.push({
    id: environmentServiceId.value,
    max_requests: environmentServiceMaxRequests.value,
  });

  emit('submit', {
    id: environmentServiceId.value ?? 0,
    max_requests: environmentServiceMaxRequests.value ?? 0,
  });
  resetForm();
}

onMounted(async () => {
  selectedServices.value = [];
  // We recover the services available in the project if they are not available in the store.
  if (projectServices.value.length === 0) {
    currentProjectId.value = Number(route.params.project_id);
    const response = await projectStore.getProjectById(currentProjectId.value);
    availableProjectServices.value = response?.services ?? [];
    idsStore.setProjectServices(availableProjectServices.value);
  }
  // We validate which services are already assigned to the project with their ID and remove them from the list of available services.
  currentEnvironmentId.value = Number(route.params.environment_id);
  const previousAssigned = await environmentStore.getEnvironmentById(
    currentEnvironmentId.value || 0,
  );
  selectedServices.value.push(
    ...(previousAssigned?.services || []).map((service) => ({
      id: service.id,
      max_requests: service.max_requests,
    })),
  );
});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
