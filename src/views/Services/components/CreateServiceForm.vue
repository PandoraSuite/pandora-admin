<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label for="service_name">Service Name:</label>
    <input
      id="service_name"
      v-model="serviceName"
      type="text"
      placeholder="Type service name"
      class="input w-full"
    />
    <label for="service_version">Service Version:</label>
    <input
      id="service_version"
      v-model="serviceVersion"
      type="text"
      placeholder="Type service version"
      class="input w-full"
    />
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const serviceName = ref('');
const serviceVersion = ref('');

const emit = defineEmits<{
  (e: 'submit', data: { name: string; version: string }): void;
}>();

function resetForm() {
  serviceName.value = '';
  serviceVersion.value = '';
}

function submitForm() {
  emit('submit', { name: serviceName.value, version: serviceVersion.value });
  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
