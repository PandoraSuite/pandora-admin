<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <div class="flex-grow flex items-center justify-center bg-background-color">
      <div class="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
        <div class="flex flex-col items-center justify-center">
          <div class="h-48 w-24">
            <img :src="pandoraLogo" alt="Pandora Logo" />
          </div>
          <h1 class="text-2xl mb-8 font-bold text-primary">Please Sing in</h1>
        </div>
        <form @submit.prevent="handleLogin">
          <div>
            <input
              type="text"
              class="input input-secondary mb-8 w-full border border-secondary"
              placeholder="Username"
              v-model="username"
              required
            />
            <div class="relative">
              <input
                :type="passwordFieldType"
                placeholder="Password"
                class="input input-secondary mb-8 w-full border border-secondary"
                v-model="password"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-0 top-2 pr-3 text-gray-400 hover:text-gray-600"
                aria-label="Mostrar u ocultar contraseña"
              >
                <font-awesome-icon :icon="passwordIcon" />
              </button>
            </div>
            <button
              class="btn btn-primary text-white w-1/3 block mx-auto"
              type="submit"
            >
              <font-awesome-icon icon="user" class="mr-2" />Sign in
            </button>
          </div>
          <p class="text-primary text-center mt-5">Version xxx</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppHeader from './header.vue';
import pandoraLogo from '../../../public/assets/white-logo.png';

const username = ref('');
const password = ref('');
const isPasswordVisible = ref(false);

// Password input type
const passwordFieldType = computed<'password' | 'text'>(() =>
  isPasswordVisible.value ? 'text' : 'password'
);

// Icon to display (open or closed eye)
const passwordIcon = computed(() =>
  isPasswordVisible.value ? 'eye-slash' : 'eye'
);

// Function to toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleLogin = () => {
  console.log('Login attempt with:', {
    username: username.value,
    password: password.value,
  });
};
</script>

<style scoped></style>
