<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label for="client_name">Client Name:</label>
    <input
      id="client_name"
      v-model="clientName"
      type="text"
      placeholder=""
      class="input w-full bg-background outline-1"
    />
    <label for="client_email">Client Email:</label>
    <input
      id="client_email"
      v-model="clientEmail"
      type="email"
      placeholder=""
      class="input w-full bg-background outline-1"
    />
    <label for="client_type">Client Type:</label>
    <select
      id="client_type"
      v-model="clientType"
      placeholder="Type client type"
      class="select w-full bg-background outline-1"
    >
      <option v-for="(optionLabel, optionValue, i) in ClientTypeLabels" :key="i" :value="optionValue">
        {{ optionLabel }}
      </option>
    </select>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { ClientTypeLabels } from '@enums/clientType';

const clientName = ref<string>('');
const clientEmail = ref<string>('');
const clientType = ref<string>('');

const emit = defineEmits<{
  (e: 'submit', data: { name: string; email: string; type: string }): void;
}>();

function resetForm() {
  clientName.value = '';
  clientEmail.value = '';
  clientType.value = '';
}

function submitForm() {
  if (!clientType.value) return;
  emit('submit', {
    name: clientName.value,
    email: clientEmail.value,
    type: clientType.value,
  });
  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
