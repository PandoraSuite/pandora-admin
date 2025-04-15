<template>
  <div class="relative">
    <input
      :type="fieldType"
      :placeholder="props.placeholder"
      :v-model="props.modelValue"
      @input="handleInput"
      class="input mb-8 w-full border border-accent input-accent"
      required
      autocomplete="new-password"
    />
    <button
      type="button"
      @click="togglePasswordVisibility"
      class="absolute top-2 right-0 pr-3 text-gray-400 hover:text-gray-600"
    >
      <font-awesome-icon :icon="iconName" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const isPasswordVisible = ref<boolean>(false);

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

// Password input type
const fieldType = computed<'password' | 'text'>(() =>
  isPasswordVisible.value ? 'text' : 'password',
);

// Icon to display (open or closed eye)
const iconName = computed(() =>
  isPasswordVisible.value ? 'eye-slash' : 'eye',
);

// Function to toggle password visibility
const togglePasswordVisibility = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const emit = defineEmits(['update:modelValue']);

// Function to emit the v-model update
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped></style>
