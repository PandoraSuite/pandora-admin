<template>
  <button
    class="tooltip btn tooltip-top bg-success btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
    :data-tip="`${TooltipMessagesLabels.editModalTitle} ${props.title}.`"
    @click="openModal()"
  >
    <font-awesome-icon
      :icon="['fas', 'pen-to-square']"
      class="text text-white"
    />
  </button>

  <dialog
    id="edit_modal"
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
      <h3 class="justify-self-start text-xl font-bold">
        Edit {{ props.title }}.
      </h3>

      <component
        ref="formComponentRef"
        :is="props.formComponent"
        @submit="handleFormSubmit"
        @item-updated="$emit('itemUpdated')"
      />
    </div>
  </dialog>
</template>

<script setup lang="ts" generic="T">
import { TooltipMessagesLabels } from '@enums/tooltipsTexts';
import { ref, type DefineComponent } from 'vue';

const formComponentRef = ref<any>(null);

const props = defineProps<{
  title: string;
  formComponent: DefineComponent<{}, {}, any>;
  // {} = props, {} = raw bindings, any = slots
}>();

const emit = defineEmits<{
  (e: 'submitForm', data: T): void;
  (e: 'itemUpdated'): void;
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
