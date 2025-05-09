<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <div class="bg-background-color flex flex-grow items-center justify-center">
      <div class="w-full max-w-md rounded-xl bg-sidebar p-6 shadow-lg">
        <div class="flex flex-col items-center justify-center">
          <img
            src="/assets/color-logo-only.svg"
            alt="Pandora Logo Light"
            class="mb-2 block h-[170px] w-[90px] dark:hidden"
          />
          <img
            src="/assets/white-logo-only.svg"
            alt="Pandora Logo Dark"
            class="mb-2 hidden h-[170px] w-[90px] dark:block"
          />
          <h1 class="mb-8 text-2xl font-bold text-subtitle">Please Sing in</h1>
        </div>
        <form @submit.prevent="handleLogin">
          <input
            id="username"
            type="text"
            class="input my-4 w-full border border-border bg-background input-accent"
            placeholder="Username"
            v-model="username"
            autocomplete="username"
            @input="clearErrors($event)"
          />
          <p v-if="usernameError" class="text-sm text-error my-2">
            {{ usernameError }}
          </p>
          <PasswordInput
            id="password"
            v-model="password"
            placeholder="Password"
            autocomplete="current-password"
            @input="clearErrors($event)"
          />
          <p v-if="passwordError" class="text-sm text-error my-2">
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
              ><font-awesome-icon icon="user" class="mr-2" />Sign in</span
            >
          </button>
          <p class="mt-5 text-center text-subtitle">Version xxx</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@store/useAuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './components/Header.vue';
import PasswordInput from './components/PasswordInput.vue';

const username = ref<string>('');
const usernameError = ref<string | null>(null);
const password = ref<string>('');
const passwordError = ref<string | null>(null);
const authStore = useAuthStore();
const router = useRouter();

// Clear error messages when the user interacts with the input fields.
function clearErrors(event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const field = target.id;

  switch (field) {
    case 'username':
      usernameError.value = null;
      break;
    case 'password':
      passwordError.value = null;
      break;
  }
}

const handleLogin = async (): Promise<void> => {
  usernameError.value = null;
  passwordError.value = null;

  if (!username.value || !password.value) {
    usernameError.value = 'Username is required';
    passwordError.value = 'Password is required';
    return;
  }

  await authStore.login({
    username: username.value,
    password: password.value,
  });
  if (authStore.mustResetPassword) {
    router.push('/reset-password');
  } else {
    router.push('/services');
  }
};
</script>

<style scoped></style>
