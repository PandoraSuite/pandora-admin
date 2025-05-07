import type { AxiosError } from 'axios';
import type { StandardResponse } from '../types/response';

export function handleHttpError(error: AxiosError): StandardResponse<any> {
  if (error.response) {
    // The server responded with a code outside the 2xx range
    return {
      success: false,
      error: error.response.data,
    };
  } else if (error.request) {
    // The request was made but there was no response.
    return {
      success: false,
      error: 'No response received from server',
    };
  }

  // Error configuring the request
  return {
    success: false,
    error: error.message || 'Request setup failed',
  };
}
