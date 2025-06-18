<template>
  <form
    id="create-apikey"
    class="mx-auto mt-8 mb-5 flex h-fit w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label for="expires_at" :class="[apiExpiresAtError ? 'text-error' : 'text']"
      >Expires at:</label
    >
    <Datepicker
      v-model="apiExpiresAt"
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
    <p v-if="apiExpiresAtError" class="text-sm text-error">
      {{ apiExpiresAtError }}
    </p>
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, nextTick, ref, watch } from 'vue';

import { useIdsStore } from '@store/useIdsStore';
import { useThemeStore } from '@store/useToggleThemeStore';

const apiExpiresAt = ref<Date | null>(null);
const apiExpiresAtError = ref<string | null>(null);

const idsStore = useIdsStore();
const themeStore = useThemeStore();

const isDark = computed(() =>
  themeStore.currentTheme === 'dark' ? true : false,
);

watch(apiExpiresAt, (newValue) => {
  if (newValue !== null && apiExpiresAtError.value) {
    apiExpiresAtError.value = null;
  }
});

function resetForm() {
  apiExpiresAt.value = null;

  apiExpiresAtError.value = null;
}

const emit = defineEmits<{
  (e: 'submit', data: { environment_id: number; expires_at: Date }): void;
}>();

function submitForm() {
  apiExpiresAtError.value = null;

  let isValid = true;

  if (!apiExpiresAt.value) {
    apiExpiresAtError.value = 'API expires at date is required';
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  emit('submit', {
    environment_id: idsStore.environmentId ?? 0,
    expires_at: apiExpiresAt.value ?? new Date(),
  });
  resetForm();
}

function expand() {
  nextTick(() => {
    const form = document.getElementById('create-apikey');
    if (form) {
      form.style.height = form.scrollHeight + 'px';
    }
  });
}

function collapse() {
  nextTick(() => {
    const form = document.getElementById('create-apikey');
    if (form) {
      form.style.height = 'fit-content';
    }
  });
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped>
:deep(.date-input) {
  width: 100%;
  background-color: var(--color-background);
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
