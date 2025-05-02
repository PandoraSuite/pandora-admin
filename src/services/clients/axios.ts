import { loadToken } from '@composables/token';
import { useToastStore } from '@store/modules/useToastStore';
import axios from 'axios';

// Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000, // Maximum wait time in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to add the token if needed
api.interceptors.request.use(
  (config) => {
    const token = loadToken(); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Request error:', error.response?.data || error.message);

    const message =
      error.detail ||
      error.message ||
      'An unexpected error occurred.';

    // We call store directly inside the interceptor
    const toastStore = useToastStore();
    toastStore.showToast(message, 'error');

    return Promise.reject(error);
  },
);

export default api;
