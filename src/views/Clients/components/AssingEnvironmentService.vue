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

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

import { useIdsStore } from '@store/useIdsStore';

const environmentServiceId = ref<number | null>(null);
const environmentServiceIdError = ref<string | null>(null);
const environmentServiceMaxRequests = ref<number | null>(null);
const environmentServiceMaxRequestsError = ref<string | null>(null);

const selectedServices = ref<
  {
    id: number | null;
    max_request: number | null;
  }[]
>([]);

const idsStore = useIdsStore();
const { projectServices } = storeToRefs(idsStore);

// Computed property to filter available services based on selected services.
const availableServices = computed(() =>
  projectServices.value.filter(
    (service) => !selectedServices.value.some((s) => s.id === service.id),
  ),
);

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
      break;
  }
}

function resetForm() {
  environmentServiceId.value = null;
  environmentServiceMaxRequests.value = null;

  // Reset error messages.
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;
}

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      id: number;
      max_request: number;
    },
  ): void;
}>();

function submitForm() {
  environmentServiceIdError.value = null;
  environmentServiceMaxRequestsError.value = null;

  if (!environmentServiceId.value || !environmentServiceMaxRequests.value) {
    environmentServiceIdError.value = 'Service is required';
    environmentServiceMaxRequestsError.value = 'Max request is required';
    return;
  }

  selectedServices.value.push({
    id: environmentServiceId.value,
    max_request: environmentServiceMaxRequests.value,
  });

  emit('submit', {
    id: environmentServiceId.value,
    max_request: environmentServiceMaxRequests.value,
  });
  resetForm();
}

onMounted(() => {
  selectedServices.value = [];
});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
