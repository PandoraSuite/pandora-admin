<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <span class="flex flex-row items-center justify-between">
      <label
        for="recalculate_next_reset"
        class="mr-auto text-lg"
        :class="[recalculateNextResetError ? 'text-error' : 'text-text']"
        >Recalculate next reset?:</label
      >
      <span class="flex flex-row items-center gap-2">
        <label
          for="recalculate_next_reset_checkbox_yes"
          class="text-lg text-text"
        >
          {{ RecalculateNextResetLabels[1] }}
        </label>
        <input
          id="recalculate_next_reset_checkbox_yes"
          type="radio"
          name="recalculate_next_reset_group"
          class="checkbox"
          :value="RecalculateNextReset.yes"
          v-model="recalculateNextReset"
          @change="clearErrors($event)"
        />
        <label
          for="recalculate_next_reset_checkbox_no"
          class="text-lg text-text"
        >
          {{ RecalculateNextResetLabels[0] }}
        </label>
        <input
          id="recalculate_next_reset_checkbox_no"
          type="radio"
          name="recalculate_next_reset_group"
          class="checkbox"
          :value="RecalculateNextReset.no"
          v-model="recalculateNextReset"
          @change="clearErrors($event)"
        />
      </span>
    </span>
    <p v-if="recalculateNextResetError" class="mr-auto text-sm text-error">
      {{ recalculateNextResetError }}
    </p>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  RecalculateNextReset,
  RecalculateNextResetLabels,
} from '@enums/recalculateNextReset';
import type { RefreshServiceQuota } from '../../../types/projects';

const recalculateNextReset = ref<boolean | null>(null);
const recalculateNextResetError = ref<string | null>(null);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'recalculate_next_reset_checkbox_yes':
    case 'recalculate_next_reset_checkbox_no':
      recalculateNextResetError.value = null;
      break;
  }
}

const emit = defineEmits<{
  (e: 'submit', recalculate_next_reset: RefreshServiceQuota): void;
}>();

function resetForm() {
  recalculateNextReset.value = null;

  recalculateNextResetError.value = null;
}

function submitForm() {
  if (
    recalculateNextReset.value === null ||
    recalculateNextReset.value === undefined
  ) {
    recalculateNextResetError.value = 'Recalculate next reset is required.';
    return;
  }

  const booleanValue = !!recalculateNextReset.value;

  emit('submit', {
    recalculate_next_reset: booleanValue,
  });

  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
