import { loadToken, saveToken } from '@composables/token';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type {
  ChangePasswordPayload,
  LoginPayload,
} from '@services/repositories/authRepository';

import { repositories } from '@services/repositories/repositoriesFactory';

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  const token = ref<String | null>(loadToken());
  const isLoading = ref<boolean>(false);
  const mustResetPassword = ref<boolean>(false);

  // --- GETTERS ---
  // Computed getter to check if authenticated (based on token existence)
  const isAuthenticated = computed<boolean>(() => !!token.value);

  // --- ACTIONS ---
  const login = async (payload: LoginPayload) => {
    isLoading.value = true;
    try {
      const response = await repositories.auth.login(payload);
      saveToken(response.access_token);
      token.value = response.access_token;
      mustResetPassword.value = response.force_password_reset;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error logging in user ${err.message}`);
      } else {
        throw new Error('Unexpected error while logging in user');
      }
    } finally {
      isLoading.value = false;
    }
  };

  const changePassword = async (payload: ChangePasswordPayload) => {
    isLoading.value = true;
    try {
      await repositories.auth.changePassword(payload);
      mustResetPassword.value = false;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(`Error changing password ${err.message}`);
      } else {
        throw new Error('Unexpected error while changing password');
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    token,
    isLoading,
    mustResetPassword,
    isAuthenticated,
    login,
    changePassword,
  };
});
