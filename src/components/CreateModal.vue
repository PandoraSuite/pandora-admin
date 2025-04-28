<template>
  <!-- The button to open modal -->
  <label
    for="create_modal"
    class="btn gap-3 bg-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-lg"
  >
    <font-awesome-icon :icon="['fas', 'plus']" class="text-white" />
    <h5 class="text-white">Create</h5>
  </label>

  <input type="checkbox" id="create_modal" class="modal-toggle" />
  <dialog id="create_modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-background">
      <!-- Close button for closing modal -->
      <label
        for="create_modal"
        class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm"
        >X</label
      >
      <h3 class="text-lg font-bold">Create a new {{ props.title }}.</h3>
      
      <!-- Insert the form corresponding to the view here. -->
      
      <div class="modal-action gap-5">
        <button
          class="btn bg-accent"
          @click="emitClickEvent"
        >
          <h5 class="text-white">Create</h5>
        </button>
        <form method="dialog">
          <!-- Close button for closing modal -->
          <label for="create_modal" class="btn bg-error text-white"
            >Close</label
          >
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['handleClick']);

const props = defineProps<{
  title: string;
  // Perform component injection through props for create form.
}>();

const emitClickEvent = () => {
  // Emits the 'handleClick' event to the parent component.
  emit('handleClick', 'Create clicked');
};
</script>

<style scoped></style>
