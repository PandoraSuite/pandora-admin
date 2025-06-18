<template>
  <button
    class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
    :data-tip="`Reveal ${props.title}.`"
    @click="openModal()"
  >
    <font-awesome-icon :icon="['fas', 'eye']" class="text text-white" />
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
      <h3 class="justify-self-start text-xl font-bold">
        Reveal {{ props.title }}.
      </h3>

      <section v-if="!isVisible" class="my-10 flex flex-col gap-3.5">
        <h4 class="text-left">
          {{ TitleMessagesLabels.reauthenticate }}
        </h4>

        <form @submit.prevent="handleReauthenticate">
          <PasswordInput
            id="password"
            v-model="password"
            placeholder="Password"
            autocomplete="current-password"
            @input="clearErrors($event)"
          />
          <p v-if="passwordError" class="my-2 text-sm text-error">
            {{ passwordError }}
          </p>

          <button
            class="btn mx-auto my-3 block w-1/3 text-white btn-primary"
            type="submit"
          >
            <span
              v-if="authStore.isLoading"
              class="loading loading-spinner"
            ></span>
            <span v-else
              ><font-awesome-icon icon="user" class="mr-2" />Verify</span
            >
          </button>
        </form>
      </section>

      <section v-else class="my-10 flex flex-col gap-3.5">
        <h4 class="text-left">
          {{ TitleMessagesLabels.apiKeyVisible }}
        </h4>
        <p>{{ APIKey }}</p>
      </section>
    </div>
  </dialog>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';

import { TitleMessagesLabels } from '@enums/componentTitle';
import { RevealAPIKeyActionLabels } from '@enums/revealAPIKey';
import { useAPIKeysStore } from '@store/useAPIKeysStore';
import { useAuthStore } from '@store/useAuthStore';
import PasswordInput from '@views/Login/components/PasswordInput.vue';
import type { RevealAPIKey } from '../types/apiKeys';
import type {
  ReauthenticatesPayload,
  ReauthenticatesResponse,
} from '../types/authentication';

const isVisible = ref<boolean>(false);
const password = ref<string>('');
const passwordError = ref<string | null>(null);
const reauthenticateData = ref<ReauthenticatesPayload | null>(null);
const APIKey = ref<RevealAPIKey | null>(null);

const authStore = useAuthStore();
const apiKeyStore = useAPIKeysStore();

const props = defineProps<{
  title: string;
  id: number;
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
}

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'password':
      passwordError.value = null;
      break;
  }
}

async function revealAPIKey(id: number): Promise<RevealAPIKey> {
  const response = await apiKeyStore.revealAPIKey(id);
  if (response) {
    APIKey.value = response.data;
    isVisible.value = true;
  }
}

async function handleReauthenticate(): Promise<ReauthenticatesResponse> {
  passwordError.value = null;

  let isValid = true;

  if (!password.value) {
    passwordError.value = 'Password is required.';
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  reauthenticateData.value = {
    action: RevealAPIKeyActionLabels.action,
    password: password.value,
  };

  const response = await authStore.reauthenticate(reauthenticateData.value);
  if (response) {
    revealAPIKey(props.id);
  }
}

function handleFormSubmit(data: T) {
  emit('submitForm', data);
  toggleModal.value?.close();
}
</script>

<style scoped></style>
