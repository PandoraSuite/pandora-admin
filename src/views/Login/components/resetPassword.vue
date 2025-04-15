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
        <form @submit.prevent="handleLogin">
          <PasswordInput v-model="password" placeholder="Password" />
          <PasswordInput
            v-model="confirmPassword"
            placeholder="Confirm password"
          />
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
import { ref } from 'vue';
import AppHeader from './header.vue';
import PasswordInput from './passwordInput.vue';

const password = ref<string>('');
const confirmPassword = ref<string>('');

const handleLogin = (): void => {
  console.log('Login attempt with:', {
    password: password.value,
    confirmPassword: confirmPassword.value,
  });
};
</script>

<style scoped></style>
