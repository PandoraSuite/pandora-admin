<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="service_name"
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
    <label
      for="service_version"
      :class="[serviceVersionError ? 'text-error' : 'text']"
      >Version:</label
    >
    <input
      id="service_version"
      v-model="serviceVersion"
      type="text"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full border bg-background outline-1"
    />
    <p v-if="serviceVersionError" class="text-sm text-error">
      {{ serviceVersionError }}
    </p>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const serviceName = ref<string>('');
const serviceNameError = ref<string | null>(null);
const serviceVersion = ref<string>('');
const serviceVersionError = ref<string | null>(null);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'service_name':
      serviceNameError.value = null;
      break;
    case 'service_version':
      serviceVersionError.value = null;
      break;
  }
}

const emit = defineEmits<{
  (e: 'submit', data: { name: string; version: string }): void;
}>();

function resetForm() {
  serviceName.value = '';
  serviceVersion.value = '';

  serviceNameError.value = null;
  serviceVersionError.value = null;
}

function submitForm() {
  if (!serviceName.value || !serviceVersion.value) {
    serviceNameError.value = 'Service name is required';
    serviceVersionError.value = 'Service version is required';
    return;
  }

  if (serviceName.value.length < 3) {
    serviceNameError.value = 'Service name must be at least 3 characters long';
    return;
  }

  emit('submit', { name: serviceName.value, version: serviceVersion.value });
  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
