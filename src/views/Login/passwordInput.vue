<template>
  <div class="relative">
    <input
      :type="fieldType"
      :placeholder="props.placeholder"
      :v-model="props.modelValue"
      @input="handleInput"
      class="input input-accent mb-8 w-full border border-accent"
      required
      autocomplete="new-password"
    />
    <button
      type="button"
      @click="togglePasswordVisibility"
      class="absolute right-0 top-2 pr-3 text-gray-400 hover:text-gray-600"
    >
      <font-awesome-icon :icon="iconName" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const isPasswordVisible = ref(false);

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  }
});

// Password input type
const fieldType = computed<'password' | 'text'>(() =>
  isPasswordVisible.value ? 'text' : 'password'
);

// Icon to display (open or closed eye)
const iconName = computed(() =>
  isPasswordVisible.value ? 'eye-slash' : 'eye'
);

// Function to toggle password visibility
const togglePasswordVisibility = () => {
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
