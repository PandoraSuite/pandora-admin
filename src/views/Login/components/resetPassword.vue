<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <div class="bg-background-color flex flex-grow items-center justify-center">
      <div class="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div class="flex flex-col items-center justify-center">
          <img
            src="/assets/color-logo-only.svg"
            alt="Pandora Logo"
            class="mb-2 h-[170px] w-[90px]"
          />
          <h1 class="mb-8 text-2xl font-bold text-primary">Reset password</h1>
        </div>
        <form @submit.prevent="handleResetPassword">
          <PasswordInput v-model="password" placeholder="Password" autocomplete="new-password" />
          <PasswordInput
            v-model="confirmPassword"
            placeholder="Confirm password"
            autocomplete="new-password"
          />
          <p
            v-if="errorMessage"
            class="-translate-y-4 text-center text-sm text-error"
          >
            {{ errorMessage }}
          </p>
          <button
            class="btn mx-auto block w-1/2 text-white btn-primary"
            type="submit"
          >
            <font-awesome-icon icon="lock-open" class="mr-2" />Reset password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@store/modules/useAuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './Header.vue';
import PasswordInput from './PasswordInput.vue';

const password = ref<string>('');
const confirmPassword = ref<string>('');
const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref<string | null>(null);

const handleResetPassword = async (): Promise<void> => {
  errorMessage.value = null; // Clears previous errors before starting

  // Validation 1: Minimum length
  if (password.value.length < 12) {
    errorMessage.value = 'The password must be at least 12 characters long.';
    return;
  }

  // Validation 2: Passwords match ---
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'The passwords do not match.';
    return;
  }

  try {
    await authStore.changePassword({
      new_password: password.value,
      confirm_password: confirmPassword.value,
    });
    router.push('/services');
  } catch (error: unknown) {
    // Catches the error thrown by the store action
    console.error('Change password failed:', error);
  }
};
</script>

<style scoped></style>
