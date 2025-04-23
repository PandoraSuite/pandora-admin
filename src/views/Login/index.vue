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
            type="text"
            class="input mb-8 w-full border border-accent bg-white text-black input-accent placeholder:text-gray-500"
            placeholder="Username"
            v-model="username"
            required
            autocomplete="username"
          />
          <PasswordInput
            v-model="password"
            placeholder="Password"
            autocomplete="current-password"
          />
          <button
            class="btn mx-auto block w-1/3 text-white btn-primary"
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
import { useAuthStore } from '@store/modules/useAuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './components/Header.vue';
import PasswordInput from './components/PasswordInput.vue';

const username = ref<string>('');
const password = ref<string>('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async (): Promise<void> => {
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    });
    if (authStore.mustResetPassword) {
      router.push('/reset-password');
    } else {
      router.push('/services');
    }
  } catch (error: unknown) {
    // Catches the error thrown by the store action
    console.error('Login failed:', error);
  }
};
</script>

<style scoped></style>
