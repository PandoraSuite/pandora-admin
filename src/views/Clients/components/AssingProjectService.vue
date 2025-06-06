<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
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

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

import { ResetServiceFrequencyLabels } from '@enums/resetServiceFrequency';
import { useServicesStore } from '@store/useServicesStore';

const projectServiceId = ref<number | null>(null);
const projectServiceIdError = ref<string | null>(null);
const projectServiceMaxRequests = ref<number | null>(null);
const projectServiceMaxRequestsError = ref<string | null>(null);
const projectServiceResetFrequency = ref<string | null>(null);
const projectServiceResetFrequencyError = ref<string | null>(null);
const selectedServices = ref<
  {
    id: number | null;
    max_request: number | null;
    reset_frequency: string | null;
  }[]
>([]);

const serviceStore = useServicesStore();
const { services } = storeToRefs(serviceStore);

// Computed property to filter available services based on selected services.
const availableServices = computed(() =>
  services.value.filter(
    (service) => !selectedServices.value.some((s) => s.id === service.id),
  ),
);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
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
  projectServiceId.value = null;
  projectServiceMaxRequests.value = null;
  projectServiceResetFrequency.value = null;

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

  if (
    !projectServiceId.value ||
    !projectServiceMaxRequests.value ||
    !projectServiceResetFrequency.value
  ) {
    projectServiceIdError.value = 'Service is required';
    projectServiceMaxRequestsError.value = 'Max request is required';
    projectServiceResetFrequencyError.value = 'Reset frequency is required';
    return;
  }

  selectedServices.value.push({
    id: projectServiceId.value,
    max_request: projectServiceMaxRequests.value,
    reset_frequency: projectServiceResetFrequency.value,
  });

  emit('submit', {
    id: projectServiceId.value,
    max_requests: projectServiceMaxRequests.value,
    reset_frequency: projectServiceResetFrequency.value,
  });
  resetForm();
}

onMounted(() => {
  serviceStore.getServices();
  selectedServices.value = [];
});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
