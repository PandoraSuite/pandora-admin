<template>
  <button
    class="btn gap-3 bg-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-lg"
    @click="openModal()"
  >
    <font-awesome-icon :icon="['fas', 'plus']" class="text-white" />
    <h5 class="text-white">{{ props.buttonText }}</h5>
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
      <h3 class="text-lg font-bold">
        {{ props.buttonText }} a new {{ props.title }}
      </h3>

      <component
        ref="formComponentRef"
        :is="props.formComponent"
        @submit="handleFormSubmit"
      />
    </div>
  </dialog>
</template>

<script setup lang="ts" generic="T">
import { ref, type DefineComponent } from 'vue';

const formComponentRef = ref<any>(null);

const props = defineProps<{
  title: string;
  buttonText: string;
  formComponent: DefineComponent<{}, {}, any>;
  // {} = props, {} = raw bindings, any = slots
}>();

const emit = defineEmits<{
  (e: 'submitForm', data: T): void;
}>();

const toggleModal = ref<HTMLDialogElement | null>(null);

function openModal() {
  toggleModal.value?.showModal();
}

function closeModal() {
  toggleModal.value?.close();
  formComponentRef.value?.resetForm();
}

function handleFormSubmit(data: T) {
  emit('submitForm', data);
  toggleModal.value?.close();
  formComponentRef.value?.resetForm();
}
</script>

<style scoped></style>
