<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label for="client_name" :class="[clientNameError ? 'text-error' : 'text']"
      >Name:</label
    >
    <input
      id="client_name"
      v-model="clientName"
      type="text"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full bg-background outline-1"
    />
    <p v-if="clientNameError" class="text-sm text-error">
      {{ clientNameError }}
    </p>
    <label
      for="client_email"
      :class="[clientEmailError ? 'text-error' : 'text']"
      >Email:</label
    >
    <input
      id="client_email"
      v-model="clientEmail"
      type="email"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full bg-background outline-1"
    />
    <p v-if="clientEmailError" class="text-sm text-error">
      {{ clientEmailError }}
    </p>
    <label for="client_type" :class="[clientTypeError ? 'text-error' : 'text']"
      >Type:</label
    >
    <select
      id="client_type"
      v-model="clientType"
      placeholder=""
      @input="clearErrors($event)"
      class="select w-full bg-background outline-1"
    >
      <option
        v-for="(optionLabel, optionValue, i) in ClientTypeLabels"
        :key="i"
        :value="optionValue"
      >
        {{ optionLabel }}
      </option>
    </select>
    <p v-if="clientTypeError" class="text-sm text-error">
      {{ clientTypeError }}
    </p>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { ClientTypeLabels } from '@enums/clientType';

const clientName = ref<string>('');
const clientNameError = ref<string | null>(null);
const clientEmail = ref<string>('');
const clientEmailError = ref<string | null>(null);
const clientType = ref<string>('');
const clientTypeError = ref<string | null>(null);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'client_name':
      clientNameError.value = null;
      break;
    case 'client_email':
      clientEmailError.value = null;
      break;
    case 'client_type':
      clientTypeError.value = null;
      break;
  }
}

function resetForm() {
  clientName.value = '';
  clientEmail.value = '';
  clientType.value = '';

  clientNameError.value = null;
  clientEmailError.value = null;
  clientTypeError.value = null;
}

const emit = defineEmits<{
  (e: 'submit', data: { name: string; email: string; type: string }): void;
}>();

function submitForm() {
  if (!clientType.value || !clientEmail.value || !clientName.value) {
    clientNameError.value = 'Client name is required';
    clientEmailError.value = 'Client email is required';
    clientTypeError.value = 'Client type is required';
    return;
  }
  if (!clientEmail.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    clientEmailError.value = 'Invalid email format';
    return;
  }

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
