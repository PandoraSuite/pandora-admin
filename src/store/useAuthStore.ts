import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { clearToken, loadToken, saveToken } from '@composables/token';
import { repositories } from '@services/repositories';
import type {
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
} from '../types/authentication';

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  const error = ref<string | null>(null);
  const token = ref<String | null>(loadToken());
  const isLoading = ref<boolean>(false);
  const mustResetPassword = ref<boolean>(false);

  // --- GETTERS ---
  // Computed getter to check if authenticated (based on token existence)
  const isAuthenticated = computed<boolean>(() => !!token.value);

  // --- ACTIONS ---
  const login = async (payload: LoginPayload) => {
    isLoading.value = true;
    const response = await repositories.auth.login(payload);
    const loginResponse = response.data as LoginResponse;
    if (response.success) {
      saveToken(loginResponse.access_token);
      token.value = loginResponse.access_token;
      mustResetPassword.value = loginResponse.force_password_reset;
    } else {
      error.value = response.error;
    }
    isLoading.value = false;
  };

  const changePassword = async (payload: ChangePasswordPayload) => {
    isLoading.value = true;
    const response = await repositories.auth.changePassword(payload);
    if (response.success) {
      mustResetPassword.value = false;
    } else {
      error.value = response.error;
    }

    isLoading.value = false;
  };

  const logout = () => {
    clearToken();
    token.value = null;
    mustResetPassword.value = false;
  };

  return {
    token,
    isLoading,
    mustResetPassword,
    isAuthenticated,
    login,
    changePassword,
    logout,
  };
});
