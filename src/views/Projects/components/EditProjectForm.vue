<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="project_name"
      class="mr-auto"
      :class="[projectNameError ? 'text-error' : 'text']"
      >Name:</label
    >
    <input
      id="project_name"
      v-model="projectName"
      type="text"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full border bg-background outline-1"
    />

    <p v-if="projectNameError" class="text-sm text-error mr-auto">
      {{ projectNameError }}
    </p>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { UpdateProjectName } from '../../../types/projects';

const projectName = ref<string>('');
const projectNameError = ref<string | null>(null);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'project_name':
      projectNameError.value = null;
      break;
  }
}

const emit = defineEmits<{
  (e: 'submit', data: UpdateProjectName): void;
}>();

function resetForm() {
  projectName.value = '';

  projectNameError.value = null;
}

function submitForm() {
  if (!projectName.value) {
    projectNameError.value = 'Project name is required';
    return;
  }

  if (projectName.value) {
    emit('submit', { name: projectName.value });
  }

  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
