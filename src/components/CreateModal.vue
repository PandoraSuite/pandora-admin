<template>
  <button
    class="btn gap-3 bg-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-lg"
    @click="openModal()"
  >
    <font-awesome-icon :icon="['fas', 'plus']" class="text-white" />
    <h5 class="text-white">Create</h5>
  </button>

  <dialog
    id="create_modal"
    ref="toggleModal"
    class="modal modal-bottom sm:modal-middle"
  >
    <div class="modal-box bg-background">
      <button
        class="btn absolute top-2 right-2 btn-circle bg-error text-white btn-ghost btn-sm"
        @click="closeModal()"
      >
        X
      </button>
      <h3 class="text-lg font-bold">Create a new {{ props.title }}.</h3>

      <component
        ref="formComponentRef"
        :is="props.formComponent"
        @submit="handleFormSubmit"
      />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, type DefineComponent } from 'vue';

const formComponentRef = ref<any>(null);

const props = defineProps<{
  title: string;
  formComponent: DefineComponent<{}, {}, any>;
}>();

const emit = defineEmits<{
  (e: 'submitForm', data: any): void;
}>();

const toggleModal = ref<HTMLDialogElement | null>(null);

function openModal() {
  toggleModal.value?.showModal();
}

function closeModal() {
  toggleModal.value?.close();
  formComponentRef.value?.resetForm();
}

function handleFormSubmit(data: object) {
  emit('submitForm', data);
  toggleModal.value?.close();
  formComponentRef.value?.resetForm();
}
</script>

<style scoped></style>
