<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="edit_environment_name"
      class="mr-auto"
      :class="[environmentNameError ? 'text-error' : 'text']"
      >Name:</label
    >
    <input
      id="edit_environment_name"
      v-model="environmentName"
      type="text"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full border bg-background outline-1"
    />

    <p v-if="environmentNameError" class="mr-auto text-sm text-error">
      {{ environmentNameError }}
    </p>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { UpdateEnvironmentName } from '../../../types/environments';

const environmentName = ref<string | null>(null);
const environmentNameError = ref<string | null>(null);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'edit_environment_name':
      environmentNameError.value = null;
      break;
  }
}

const emit = defineEmits<{
  (e: 'submit', data: UpdateEnvironmentName): void;
}>();

function resetForm() {
  environmentName.value = null;

  environmentNameError.value = null;
}

function submitForm() {
  if (!environmentName.value) {
    environmentNameError.value = 'Environment name is required';
    return;
  }

  if (environmentName.value) {
    emit('submit', { name: environmentName.value });
  }

  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
