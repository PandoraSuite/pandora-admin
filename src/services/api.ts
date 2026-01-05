import axios from 'axios';

import { loadToken } from '@composables/token';
import { ToastMessages, ToastMessagesLabels } from '@enums/toastMessages';
import router from '@router/index';
import { useAuthStore } from '@store/useAuthStore';
import { useToastStore } from '@store/useToastStore';

// Abort controller for canceling requests.
let controller = new AbortController();

// Axios instance with base configuration.
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_DEFAULT_TIMEOUT), // Maximum wait time in milliseconds.
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const apiReauth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_DEFAULT_TIMEOUT), // Maximum wait time in milliseconds.
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to add the abort signal to each request.
api.interceptors.request.use((config) => {
  config.signal = controller.signal;
  return config;
});

// Interceptor to add the token if needed.
api.interceptors.request.use(
  (config) => {
    const token = loadToken(); // Get the token from local storage.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally.
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const isCanceled =
      error.code === 'ERR_CANCELED' ||
      error.name === 'CanceledError' ||
      axios.isCancel?.(error);

    if (isCanceled) {
      return Promise.reject(error);
    }

    const statusCode = error.response ? error.response.status : null;

    if (statusCode === 401) {
      controller.abort('401 Received'); // Abort any ongoing requests.
      controller = new AbortController(); // Create a new controller for future requests.
    }

    const toastStore = useToastStore();
    const authStore = useAuthStore();
    const currentRoute = router.currentRoute.value.fullPath;

    const errorData = error.response ? error.response.data : null;

    let message: string = ToastMessagesLabels.genericError;

    // Try to get the error message from the error structure.
    if (errorData && errorData.message) {
      message = errorData.message;
    } else if (error.message) {
      // Fallback for network errors or Axios no server response.
      message = error.message;
    }

    // --- Handling 401 (Unauthorized) errors ---
    if (statusCode === 401) {
      // General case: 401 error on any page (session expired/invalid).
      toastStore.showToast(
        ToastMessagesLabels.sessionExpired,
        ToastMessages.isError,
      );

      authStore.setRedirectPath(currentRoute); // Save the route to redirect after login.
      authStore.logout();

      router.push('/login');

      return Promise.reject(error); // Rejects the promise so that the error can be handled in the component.
    }

    // --- Handling 400 (Bad Request) errors ---
    if (statusCode === 400 && errorData && errorData.errors) {
      // If there is a 400 and the backend returns a list of validation errors.
      message = errorData.errors.join(', ') || message;
    }

    // --- Other errors ---
    toastStore.showToast(message, ToastMessages.isError);
    return Promise.reject(error); // Rejects the promise so that the error can be handled in the component.
  },
);

export { api, apiReauth };
