<template>
  <form
    id="edit-project-services-form"
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
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

    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, onMounted, ref } from 'vue';

const projectServiceMaxRequests = ref<number | null>(null);
const projectServiceMaxRequestsError = ref<string | null>(null);
const isUnlimited = ref<boolean>(false);

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
  projectServiceMaxRequests.value = null;

  isUnlimited.value = false;

  // Reset error messages.
  projectServiceMaxRequestsError.value = null;
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
      max_requests: number;
    },
  ): void;
}>();

function submitForm() {
  projectServiceMaxRequestsError.value = null;

  let isValid = true; // Flag to control if all validations pass.

  if (!projectServiceMaxRequests.value) {
    projectServiceMaxRequestsError.value = 'Max Requests is required.';
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // If all validations passed,
  // emit the event with the combined payload.
  emit('submit', {
    max_requests: projectServiceMaxRequests.value ?? 0,
  });

  resetForm();
}

onMounted(() => {});

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
