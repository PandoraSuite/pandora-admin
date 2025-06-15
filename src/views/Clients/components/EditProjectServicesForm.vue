<template>
  <form
    id="edit-project-services-form"
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label
      for="service_next_reset"
      class="text text-lg"
      :class="[projectServiceNextResetError ? 'text-error' : 'text-text']"
      >Next reset:</label
    >
    <Datepicker
      v-model="projectServiceNextReset"
      :format="'dd/MM/yyyy'"
      :preview-format="'dd/MM/yyyy'"
      :min-date="new Date()"
      :dark="isDark"
      :teleport="false"
      :enable-time-picker="false"
      placeholder="Select Date"
      prevent-min-max-navigation
      utc
      :ui="{
        input: 'date-input',
        menu: 'date-menu',
        calendar: 'date-calendar',
        calendarCell: 'date-cell',
      }"
      @open="expand"
      @closed="collapse"
    />
    <p v-if="projectServiceNextResetError" class="text-sm text-error">
      {{ projectServiceNextResetError }}
    </p>

    <span class="flex flex-row items-center justify-between">
      <label
        for="service_max_requests"
        class="text text-lg"
        :class="[projectServiceMaxRequestsError ? 'text-error' : 'text-text']"
        >Max Requests:</label
      >
      <span class="flex flex-row items-center gap-2">
        <label for="unlimited_requests" class="text-lg text-text"
          >Unlimited</label
        >
        <span
          class="tooltip tooltip-left flex btn-circle h-4 w-4 bg-quick-action object-center"
          data-tip="If checked, the service will have unlimited requests."
        >
          <font-awesome-icon
            :icon="['fas', 'question']"
            class="mx-auto my-auto self-center text-xs text-white"
          />
        </span>
        <input
          id="unlimited_requests"
          type="checkbox"
          v-model="isUnlimited"
          class="checkbox my-auto checkbox-sm"
          @input="clearErrors($event)"
          @change="handleUnlimitedToggle"
        />
      </span>
    </span>
    <input
      id="service_max_requests"
      v-model="displayedProjectServiceMaxRequests"
      type="number"
      :placeholder="isUnlimited ? 'Unlimited' : ''"
      :disabled="isUnlimited"
      @input="clearErrors($event)"
      class="input w-full bg-background text-text outline-1"
    />
    <p v-if="projectServiceMaxRequestsError" class="text-sm text-error">
      {{ projectServiceMaxRequestsError }}
    </p>

    <label
      for="service_reset_frequency"
      class="text text-lg"
      :class="[projectServiceResetFrequencyError ? 'text-error' : 'text-text']"
      >Reset Frequency:</label
    >
    <select
      id="service_reset_frequency"
      v-model="projectServiceResetFrequency"
      placeholder=""
      @input="clearErrors($event)"
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
    <p v-if="projectServiceResetFrequencyError" class="text-sm text-error">
      {{ projectServiceResetFrequencyError }}
    </p>

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { ResetServiceFrequencyLabels } from '@enums/resetServiceFrequency';
import { useThemeStore } from '@store/useToggleThemeStore';

const projectServiceNextReset = ref<string | null>(null);
const projectServiceNextResetError = ref<string | null>(null);
const projectServiceMaxRequests = ref<number | null>(null);
const projectServiceMaxRequestsError = ref<string | null>(null);
const projectServiceResetFrequency = ref<string | null>(null);
const projectServiceResetFrequencyError = ref<string | null>(null);
const isUnlimited = ref<boolean>(false);

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
      projectServiceResetFrequencyError.value = null;
      projectServiceNextResetError.value = null;
      break;
    case 'service_reset_frequency':
      projectServiceResetFrequencyError.value = null;
      projectServiceNextResetError.value = null;
      break;
    case 'service_next_reset':
      projectServiceNextResetError.value = null;
      break;
  }
}

function resetForm() {
  projectServiceNextReset.value = null;
  projectServiceMaxRequests.value = null;
  projectServiceResetFrequency.value = null;
  isUnlimited.value = false;

  // Reset error messages.
  projectServiceMaxRequestsError.value = null;
  projectServiceResetFrequencyError.value = null;
  projectServiceNextResetError.value = null;
}

watch(projectServiceNextReset, (newValue) => {
  if (newValue !== null && projectServiceNextResetError.value) {
    projectServiceNextResetError.value = null;
  }
});

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

// Computed property to handle the display of max requests input.
const displayedProjectServiceMaxRequests = computed({
  get() {
    // Case 1: If it is unlimited, we always want the input to be empty to display the placeholder.
    if (isUnlimited.value) {
      return '';
    }
    // Case 2: If it's NOT unlimited, but the underlying value is 0 or null, we also want the input to be visually empty to display the placeholder. This is crucial for inputs with type="number" where 0 is displayed as "0".
    if (
      projectServiceMaxRequests.value === null ||
      projectServiceMaxRequests.value === 0
    ) {
      return '';
    }
    // Case 3: In any other case (it is a positive number other than 0), we show the actual numerical value.
    return projectServiceMaxRequests.value;
  },
  set(newValue: string | null) {
    // If the user deletes all the content of the input (newValue will be an empty string '') or if null is assigned directly, we reset the underlying value to null.
    if (newValue === '' || newValue === null) {
      projectServiceMaxRequests.value = null;
    } else {
      const numValue = Number(newValue);
      // We ensure that the result of the conversion is a valid number (not NaN). `type="number"` in HTML already helps prevent non-numeric input.
      if (!isNaN(numValue)) {
        projectServiceMaxRequests.value = numValue;
      }
    }
  },
});

// Handle the toggle checkbox for unlimited requests.
function handleUnlimitedToggle() {
  if (isUnlimited.value) {
    projectServiceMaxRequests.value = -1; // Set to -1 to indicate unlimited requests.
  } else {
    projectServiceMaxRequests.value = null; // Reset to null when not unlimited.
  }
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
  projectServiceResetFrequencyError.value = null;
  projectServiceNextResetError.value = null;

  let isValid = true; // Flag to control if all validations pass.

  const payload: {
    max_requests?: number;
    next_reset?: string;
    reset_frequency?: string;
  } = {};

  // Helpers to check for the presence of values ​​(considering 0 as valid if written).
  const hasMaxRequests =
    projectServiceMaxRequests.value !== null &&
    projectServiceMaxRequests.value !== undefined;
  const hasResetFrequency =
    projectServiceResetFrequency.value !== null &&
    projectServiceResetFrequency.value !== undefined &&
    projectServiceResetFrequency.value !== '';
  const hasNextReset =
    projectServiceNextReset.value !== null &&
    projectServiceNextReset.value !== undefined;

  // --- Apply Validation Rules and Build Payload Conditionally. ---

  if (hasNextReset) {
    // If Next Reset is set, it must be accompanied by Reset Frequency and Max Requests.
    if (!hasResetFrequency && !hasMaxRequests) {
      projectServiceNextResetError.value =
        'Next Reset is not allowed without Max Requests and Reset Frequency.';
      projectServiceResetFrequencyError.value =
        'Reset Frequency is required if Next Reset is set.';
      projectServiceMaxRequestsError.value = 'Max Requests is required.';
      isValid = false;
    }

    if (hasResetFrequency) {
      // If Next Reset and Reset Frequency are set, it must also have Max Requests.
      if (!hasMaxRequests) {
        projectServiceNextResetError.value =
          'Next Reset is not allowed without Max Requests.';
        projectServiceMaxRequestsError.value = 'Max Requests is required.';
        isValid = false;
      }
    }

    if (hasMaxRequests) {
      // If Next Reset and Max Requests are set, it must also have Reset Frequency.
      if (!hasResetFrequency) {
        projectServiceNextResetError.value =
          'Next Reset is not allowed without Reset Frequency.';
        projectServiceResetFrequencyError.value =
          'Reset Frequency is required.';
        isValid = false;
      }
    }
  }

  // If Reset Frequency is set, it must be accompanied by Max Requests.
  if (hasResetFrequency) {
    if (!hasMaxRequests) {
      projectServiceResetFrequencyError.value =
        'Reset Frequency is not allowed without Max Requests.';
      projectServiceMaxRequestsError.value = 'Max Requests is required.';
      isValid = false;
    }
  }

  // Max Requests is always required. And can be set without Next Reset or Reset Frequency.
  if (!hasMaxRequests) {
    projectServiceMaxRequestsError.value = 'Max Requests is required.';
    isValid = false;
  }

  if (hasMaxRequests) {
    payload.max_requests = projectServiceMaxRequests.value ?? undefined;
  }

  if (hasResetFrequency && hasMaxRequests) {
    payload.reset_frequency = projectServiceResetFrequency.value ?? undefined;
    payload.max_requests = projectServiceMaxRequests.value ?? undefined;
  }

  if (hasNextReset && hasResetFrequency && hasMaxRequests) {
    payload.next_reset = projectServiceNextReset.value ?? undefined;
    payload.reset_frequency = projectServiceResetFrequency.value ?? undefined;
    payload.max_requests = projectServiceMaxRequests.value ?? undefined;
  }

  if (!isValid) {
    return;
  }

  // If all validations passed,
  // emit the event with the combined payload.
  emit('submit', payload);

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

#edit-project-services-form {
  transition: height 0.6s ease;
}
</style>
