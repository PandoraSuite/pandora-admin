<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="service_status"
      class="mr-auto"
      :class="[serviceStatusError ? 'text-error' : 'text']"
      >Status:</label
    >
    <select
      id="service_status"
      v-model="serviceStatus"
      placeholder=""
      @input="clearErrors($event)"
      class="select input w-full border bg-background outline-1"
    >
      <option
        v-for="(optionLabel, optionValue, i) in ServicesStatusLabels"
        :key="i"
        :value="optionValue"
      >
        {{ optionLabel }}
      </option>
    </select>
    <p v-if="serviceStatusError" class="text-sm text-error mr-auto">
      {{ serviceStatusError }}
    </p>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { ServicesStatusLabels } from '@enums/servicesStatus';
import type { UpdateServiceStatus } from '../../../types/services';

const serviceStatus = ref<string>('');
const serviceStatusError = ref<string | null>(null);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'service_status':
      serviceStatusError.value = null;
      break;
  }
}

const emit = defineEmits<{
  (e: 'submit', data: UpdateServiceStatus): void;
}>();

function resetForm() {
  serviceStatus.value = '';

  serviceStatusError.value = null;
}

function submitForm() {
  if (!serviceStatus.value) {
    serviceStatusError.value = 'Service status is required';
    return;
  }

  if (serviceStatus.value) {
    emit('submit', { status: serviceStatus.value });
  }

  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
