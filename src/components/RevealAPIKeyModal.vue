<template>
  <button
    class="tooltip btn tooltip-top bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
    :data-tip="`Reveal ${props.title}.`"
    @click="openModal()"
  >
    <font-awesome-icon :icon="['fas', 'eye']" class="text text-white" />
  </button>

  <dialog id="create_modal" ref="toggleModal" class="modal">
    <div class="modal-box w-1/3 max-w-4xl bg-background">
      <button
        class="btn absolute top-2 right-2 btn-circle bg-error text-white btn-ghost btn-sm"
        @click="closeModal()"
      >
        X
      </button>
      <h3 class="justify-self-start text-xl font-bold">
        Reveal {{ props.title }}.
      </h3>

      <section
        v-if="!isVisible"
        class="mx-auto my-10 flex w-3/4 max-w-2xl flex-col gap-3.5"
      >
        <h4 class="text-left">
          {{ TitleMessagesLabels.reauthenticate }}
        </h4>

        <form for="reauth-password" @submit.prevent="handleReauthenticate">
          <PasswordInput
            id="reauth-password"
            v-model="password"
            placeholder="Password"
            autocomplete="current-password"
            class="mx-auto w-3/5"
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

      <section
        v-else
        class="mx-auto my-10 flex w-4/5 max-w-2xl flex-col gap-3.5"
      >
        <h4 class="text-left">
          {{ TitleMessagesLabels.apiKeyVisible }}
        </h4>
        <span class="flex flex-row items-center justify-between">
          <p>{{ APIKey?.key }}</p>
          <button
            class="tooltip btn tooltip-top w-[7%] bg-accent btn-xs sm:btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
            :data-tip="`Copy to Clipboard`"
            @click="copyToClipboard"
          >
            <font-awesome-icon
              :icon="['fas', 'clipboard']"
              class="text-lg text-white"
            />
          </button>
        </span>
      </section>
    </div>
  </dialog>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';

import { TitleMessagesLabels } from '@enums/componentTitle';
import { RevealAPIKeyActionLabels } from '@enums/revealAPIKey';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import { useAPIKeysStore } from '@store/useAPIKeysStore';
import { useAuthStore } from '@store/useAuthStore';
import { useToastStore } from '@store/useToastStore';
import PasswordInput from '@views/Login/components/PasswordInput.vue';
import type { RevealAPIKey } from '../types/apiKeys';
import type { ReauthenticatesPayload } from '../types/authentication';

const isVisible = ref<boolean>(false);
const password = ref<string>('');
const passwordError = ref<string | null>(null);
const reauthenticateData = ref<ReauthenticatesPayload | null>(null);
const APIKey = ref<RevealAPIKey | null>(null);

const authStore = useAuthStore();
const apiKeyStore = useAPIKeysStore();
// Variable to store the timeout ID, so it can be cancelled if necessary.
let resetTimeoutId: ReturnType<typeof setTimeout> | null = null;

const props = defineProps<{
  title: string;
  id: number;
}>();

const toggleModal = ref<HTMLDialogElement | null>(null);

function openModal() {
  toggleModal.value?.showModal();
}

function closeModal() {
  resetAllValues();
  toggleModal.value?.close();
}

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'reauth-password':
      passwordError.value = null;
      break;
  }
}

function resetAllValues() {
  APIKey.value = null;
  reauthenticateData.value = null;
  password.value = '';
  isVisible.value = false;

  passwordError.value = null;
}

// Method to cancel the visibility of the API key and clear the values.
function scheduleDataReset(delayMs: number = 60000) {
  // By default, 60 seconds (1 minute).
  // We clear any previous timeouts to avoid multiple executions.
  if (resetTimeoutId !== null) {
    clearTimeout(resetTimeoutId);
  }

  resetTimeoutId = setTimeout(() => {
    closeModal();
    useToastStore().showToast(
      ToastMessagesLabels.apiKeyReavealExpired,
      ToastMessages.isInfo,
    );
    resetTimeoutId = null; // Clear the ID after execution.
  }, delayMs);
}

async function revealAPIKey(
  id: number,
  reauthAccessToken: string,
): Promise<void> {
  const response = await apiKeyStore.revealAPIKey(id, reauthAccessToken);
  if (response) {
    isVisible.value = true;
    APIKey.value = response;
    // Initialize function to cancel visibility of API key.
    scheduleDataReset();
  }
}

async function handleReauthenticate(): Promise<void> {
  APIKey.value = null;
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
    revealAPIKey(props.id, response.access_token);
  }
}

function copyToClipboard(): void {
  if (APIKey.value?.key) {
    navigator.clipboard.writeText(APIKey.value.key);
  }
}
</script>

<style scoped></style>
