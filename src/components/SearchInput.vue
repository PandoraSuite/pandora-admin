<template>
  <div class="relative w-[30%]">
    <font-awesome-icon
      icon="magnifying-glass"
      class="absolute top-3 z-1 pl-2"
    />
    <input
      type="text"
      :placeholder="props.placeholder"
      class="input w-full bg-background pl-8 outline-1"
      v-model="inputValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref<string>('');

const props = defineProps<{
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: 'search', value: string): void;
}>();

// --- Debounce Logic ---
// Variable to store the timer identifier (ID) returned by setTimeout.
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

// Define the handler function that will be called on every input event.
const handleInput = () => {
  // If the user continues typing, cancel the pending execution.
  if (debounceTimer) {
    // If a timer exists, clear it immediately.
    clearTimeout(debounceTimer);
  }
  // Set a new timer.
  debounceTimer = setTimeout(() => {
    // sending the current input value (with leading/trailing whitespace removed by trim()).
    emit('search', inputValue.value.trim());
  }, 500); // The delay in milliseconds.
};
</script>
