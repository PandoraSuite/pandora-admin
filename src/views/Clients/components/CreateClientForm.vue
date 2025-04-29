<template>
  <form
    class="mx-auto mt-8 mb-5 flex w-[90%] flex-col gap-4"
    @submit.prevent="submitForm"
  >
    <label for="client_name">Client Name:</label>
    <input
      id="client_name"
      v-model="clientName"
      type="text"
      placeholder="Type client name"
      class="input w-full"
    />
    <label for="client_email">Client Email:</label>
    <input
      id="client_email"
      v-model="clientEmail"
      type="email"
      placeholder="Type client email"
      class="input w-full"
    />
    <label for="client_type">Client Type:</label>
    <input
      id="client_type"
      v-model="clientType"
      type="text"
      placeholder="Type client type"
      class="input w-full"
    />
    <button type="submit" class="btn mx-auto mt-3 w-fit bg-accent text-white">
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const clientName = ref('');
const clientEmail = ref('');
const clientType = ref('');

const emit = defineEmits<{
  (e: 'submit', data: { name: string; email: string, type:string }): void;
}>();

function resetForm() {
  clientName.value = '';
  clientEmail.value = '';
  clientType.value = '';
}

function submitForm() {
  emit('submit', { name: clientName.value, email: clientEmail.value, type: clientType.value });
  resetForm();
}

// Expose the resetForm method so that the parent can call it.
defineExpose({
  resetForm,
});
</script>

<style scoped></style>
