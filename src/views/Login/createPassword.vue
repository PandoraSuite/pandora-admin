<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <div class="flex-grow flex items-center justify-center bg-background-color">
      <div class="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
        <div class="flex flex-col items-center justify-center">
          <img
            src="../../../public/assets/color-logo-only.svg"
            alt="Pandora Logo"
            class="w-[90px] h-[170px] mb-2"
          />
          <h1 class="text-2xl mb-8 font-bold text-primary">Create password</h1>
        </div>
        <form @submit.prevent="handleLogin">
          <PasswordInput v-model="password" placeholder="Password" />
          <PasswordInput
            v-model="confirmPassword"
            placeholder="Confirm password"
          />
          <button
            class="btn btn-primary text-white w-1/2 block mx-auto"
            type="submit"
          >
            <font-awesome-icon icon="lock-open" class="mr-2" />Create Password
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
