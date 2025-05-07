import type { AxiosError } from 'axios';

import type {
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
} from '../../../types/authentication';
import api from '../../api';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/auth';

export interface AuthRequests {
  login(body: LoginPayload): Promise<StandardResponse<LoginResponse>>;
  changePassword(body: ChangePasswordPayload): Promise<StandardResponse<true>>;
}

export default <AuthRequests>{
  async login(body: LoginPayload): Promise<StandardResponse<LoginResponse>> {
    try {
      const response = await api.post<LoginResponse>(
        `${RESOURCE}/login`,
        body,
      );
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
};
