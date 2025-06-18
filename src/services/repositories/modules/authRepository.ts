import type { AxiosError } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import { api } from '@services/api';
import type {
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
  ReauthenticatesPayload,
  ReauthenticatesResponse,
} from '../../../types/authentication';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/auth';

export interface AuthRequests {
  login(body: LoginPayload): Promise<StandardResponse<LoginResponse>>;
  changePassword(body: ChangePasswordPayload): Promise<StandardResponse<true>>;
  reauthenticate(
    payload: ReauthenticatesPayload,
  ): Promise<StandardResponse<ReauthenticatesResponse>>;
}

export default <AuthRequests>{
  async login(body: LoginPayload): Promise<StandardResponse<LoginResponse>> {
    try {
      const response = await api.post<LoginResponse>(`${RESOURCE}/login`, body);
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  async changePassword(
    body: ChangePasswordPayload,
  ): Promise<StandardResponse<true>> {
    try {
      await api.post<true>(`${RESOURCE}/change-password`, body);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  async reauthenticate(
    payload: ReauthenticatesPayload,
  ): Promise<StandardResponse<ReauthenticatesResponse>> {
    try {
      const response = await api.post<ReauthenticatesResponse>(
        `${RESOURCE}/reauthenticate`,
        payload,
      );
      const processedResponse = response.data;
      // Access the backend response to capture 'expires_in' and format it to local time and date.
      processedResponse.expires_in = datetimeFormatter.format(
        new Date(processedResponse.expires_in),
      );
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },
};
