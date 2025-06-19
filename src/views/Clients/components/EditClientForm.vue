<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label for="edit_client_name" class="mr-auto">Name:</label>
    <input
      id="edit_client_name"
      v-model="clientName"
      type="text"
      placeholder=""
      class="input w-full bg-background outline-1"
    />
    <label
      for="edit_client_email"
      class="mr-auto"
      :class="[clientEmailError ? 'text-error' : 'text']"
      >Email:</label
    >
    <input
      id="edit_client_email"
      v-model="clientEmail"
      type="email"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full bg-background outline-1"
    />
    <p v-if="clientEmailError" class="text-sm text-error">
      {{ clientEmailError }}
    </p>
    <label for="edit_client_type" class="mr-auto">Type:</label>
    <select
      id="edit_client_type"
      v-model="clientType"
      placeholder=""
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
const clientEmailError = ref<string | null>(null);
const clientType = ref<string>('');

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'edit_client_email':
      clientEmailError.value = null;
      break;
  }
}

function resetForm() {
  clientName.value = '';
  clientEmail.value = '';
  clientType.value = '';

  clientEmailError.value = null;
}

const emit = defineEmits<{
  (e: 'submit', data: { name?: string; type?: string; email?: string }): void;
}>();

function submitForm() {
  if (
    clientEmail.value &&
    !clientEmail.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  ) {
    clientEmailError.value = 'Invalid email format';
    return;
  }

  if (clientName.value) {
    emit('submit', { name: clientName.value });
  }

  if (clientEmail.value) {
    emit('submit', { email: clientEmail.value });
  }

  if (clientType.value) {
    emit('submit', { type: clientType.value });
  }

  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
