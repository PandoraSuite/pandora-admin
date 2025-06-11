<template>
  <form
    id="edit-project-services-form"
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label for="service_next_reset" class="text text-lg text-text"
      >Next reset:</label
    >
    <Datepicker
      v-model="projectServiceNextReset"
      :format="'dd/MM/yyyy HH:mm:00'"
      :preview-format="'dd/MM/yyyy HH:mm:00'"
      :min-date="new Date()"
      :dark="isDark"
      :teleport="false"
      placeholder="Select Datetime"
      prevent-min-max-navigation
      utc
      :flow="['calendar', 'time']"
      :ui="{
        input: 'date-input',
        menu: 'date-menu',
        calendar: 'date-calendar',
        calendarCell: 'date-cell',
      }"
      @open="expand"
      @closed="collapse"
    />

    <label
      for="service_max_requests"
      class="text text-lg text-text"
      :class="[projectServiceMaxRequestsError ? 'text-error' : 'text']"
      >Max Requests:</label
    >
    <input
      id="service_max_requests"
      v-model="projectServiceMaxRequests"
      type="number"
      placeholder=""
      @input="clearErrors($event)"
      class="input w-full bg-background text-text outline-1"
    />
    <p v-if="projectServiceMaxRequestsError" class="text-sm text-error">
      {{ projectServiceMaxRequestsError }}
    </p>

    <label for="service_reset_frequency" class="text text-lg text-text"
      >Reset Frequency:</label
    >
    <select
      id="service_reset_frequency"
      v-model="projectServiceResetFrequency"
      placeholder=""
      class="select w-full bg-background text-text outline-1"
    >
      <option
        v-for="(
          frequenceLabel, frequenceValue, k
        ) in ResetServiceFrequencyLabels"
        :key="k"
        :value="frequenceValue"
      >
        {{ frequenceLabel }}
      </option>
    </select>

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, nextTick, onMounted, ref } from 'vue';

import { ResetServiceFrequencyLabels } from '@enums/resetServiceFrequency';
import { useThemeStore } from '@store/useToggleThemeStore';

const projectServiceNextReset = ref<string>();
const projectServiceMaxRequests = ref<number>();
const projectServiceMaxRequestsError = ref<string | null>(null);
const projectServiceResetFrequency = ref<string>();

const themeStore = useThemeStore();

const isDark = computed(() =>
  themeStore.currentTheme === 'dark' ? true : false,
);

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'service_max_requests':
      projectServiceMaxRequestsError.value = null;
      break;
  }
}

function resetForm() {
  projectServiceNextReset.value = '';
  projectServiceMaxRequests.value = 0;
  projectServiceResetFrequency.value = '';

  // Reset error messages.
  projectServiceMaxRequestsError.value = null;
}

function expand() {
  nextTick(() => {
    const form = document.getElementById('edit-project-services-form');
    if (form) {
      form.style.height = form.scrollHeight + 'px';
    }
  });
}

function collapse() {
  nextTick(() => {
    const form = document.getElementById('edit-project-services-form');
    if (form) {
      form.style.height = 'fit-content';
    }
  });
}

const emit = defineEmits<{
  (
    e: 'submit',
    data: {
      next_reset?: string;
      max_requests?: number;
      reset_frequency?: string;
    },
  ): void;
}>();

function submitForm() {
  projectServiceMaxRequestsError.value = null;

  if (
    projectServiceMaxRequests.value &&
    isNaN(projectServiceMaxRequests.value)
  ) {
    projectServiceMaxRequestsError.value =
      'Max Requests must be a valid number.';
    return;
  }

  if (projectServiceMaxRequests.value) {
    emit('submit', { max_requests: projectServiceMaxRequests.value });
  }

  if (projectServiceNextReset.value) {
    emit('submit', { next_reset: projectServiceNextReset.value });
  }

  if (projectServiceResetFrequency.value) {
    emit('submit', { reset_frequency: projectServiceResetFrequency.value });
  }

  resetForm();
}

onMounted(() => {});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped>
:deep(.date-input) {
  width: 100%;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
}

:deep(.date-menu) {
  background-color: var(--color-cards);
  color: var(--text-primary);
}

:deep(.date-cell:hover) {
  background-color: var(--color-accent);
}

:deep(.date-calendar) {
  color: var(--text-primary);
}

:deep(.dp__theme_dark) {
  --dp-primary-color: #00d1bc;
  --dp-disabled-color: #483552;
  --dp-hover-color: #926ca5;
  --dp-icon-color: #fff;
  --dp-hover-icon-color: #fff;
  --dp-background-color: #483552;
}

:deep(.dp__theme_light) {
  --dp-primary-color: #00d1bc;
  --dp-disabled-color: #cccccc;
  --dp-hover-color: #c9c5c5;
  --dp-icon-color: #1a1a1a;
  --dp-hover-icon-color: #1a1a1a;
  --dp-background-color: #f7f0f0;
}

#create-apikey {
  transition: height 0.6s ease;
}
</style>
