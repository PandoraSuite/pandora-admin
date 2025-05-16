<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="service_name"
      class="mr-auto"
      :class="[serviceNameError ? 'text-error' : 'text']"
      >Name:</label
    >
    <input
      id="service_name"
      v-model="serviceName"
      type="text"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full border bg-background outline-1"
    />
    <p v-if="serviceNameError" class="text-sm text-error">
      {{ serviceNameError }}
    </p>
    <label for="service_version" class="mr-auto">Version:</label>
    <input
      id="service_version"
      v-model="serviceVersion"
      type="text"
      placeholder=""
      class="input w-full border bg-background outline-1"
    />
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { UpdateService } from '../../../types/services';

const serviceName = ref<string>('');
const serviceNameError = ref<string | null>(null);
const serviceVersion = ref<string>('');

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'service_name':
      serviceNameError.value = null;
      break;
  }
}

const emit = defineEmits<{
  (e: 'submit', data: UpdateService): void;
}>();

function resetForm() {
  serviceName.value = '';
  serviceVersion.value = '';

  serviceNameError.value = null;
}

function submitForm() {
  if (serviceName.value.length < 3) {
    serviceNameError.value = 'Service name must be at least 3 characters long';
    return;
  }

  if (serviceName.value) {
    emit('submit', { name: serviceName.value });
  }

  if (serviceVersion.value) {
    emit('submit', { version: serviceVersion.value });
  }

  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
