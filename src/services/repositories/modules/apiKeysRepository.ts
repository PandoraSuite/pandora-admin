import type { AxiosError } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import { api, apiReauth } from '@services/api';
import type {
  APIKey,
  NewAPIKey,
  RevealAPIKey,
  UpdateAPIKey,
} from '../../../types/apiKeys';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/api-keys';

export interface APIKeyRequests {
  createAPIKey(body: NewAPIKey): Promise<StandardResponse<APIKey>>;
  updateAPIKey(
    id: number,
    body: UpdateAPIKey,
  ): Promise<StandardResponse<APIKey>>;
  deleteAPIKey(id: number): Promise<StandardResponse<true>>;
  revealAPIKey(
    id: number,
    reauthAccessToken: string,
  ): Promise<StandardResponse<RevealAPIKey>>;
  enableAPIKey(id: number, isEnable: boolean): Promise<StandardResponse<true>>;
}

export default <APIKeyRequests>{
  async createAPIKey(body: NewAPIKey): Promise<StandardResponse<APIKey>> {
    try {
      const response = await api.post<APIKey>(`${RESOURCE}`, body);
      const processedResponse = response.data;
      // Access the backend response to capture 'created_at' and format it to local time and date.
      processedResponse.created_at = datetimeFormatter.format(
        new Date(processedResponse.created_at),
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

  // Update an API Key by its id.
  async updateAPIKey(
    id: number,
    body: UpdateAPIKey,
  ): Promise<StandardResponse<APIKey>> {
    try {
      const response = await api.patch<APIKey>(`${RESOURCE}/${id}`, body);
      const processedResponse = response.data;
      // Access the backend response to capture 'created_at' and format it to local time and date.
      processedResponse.created_at = datetimeFormatter.format(
        new Date(processedResponse.created_at),
      );
      processedResponse.expires_at = datetimeFormatter.format(
        new Date(processedResponse.expires_at),
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

  // Deletes an API Keys from an environment by its id.
  async deleteAPIKey(id: number): Promise<StandardResponse<true>> {
    try {
      await api.delete<true>(`${RESOURCE}/${id}`);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Reveals the protected key.
  async revealAPIKey(
    id: number,
    reauthAccessToken: string,
  ): Promise<StandardResponse<RevealAPIKey>> {
    try {
      const response = await apiReauth.get<RevealAPIKey>(
        `${RESOURCE}/${id}/reveal/key`,
        {
          headers: {
            Authorization: `Bearer ${reauthAccessToken}`,
          },
        },
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

  // Toggle enable or disable an API key by its id.
  async enableAPIKey(
    id: number,
    isEnable: boolean,
  ): Promise<StandardResponse<true>> {
    if (isEnable) {
      try {
        await api.post<true>(`${RESOURCE}/${id}/enable`);
        return {
          success: true,
          status: 'enabled',
        };
      } catch (err) {
        const error = err as AxiosError;

        return handleHttpError(error);
      }
    } else {
      try {
        await api.post<true>(`${RESOURCE}/${id}/disable`);
        return {
          success: true,
          status: 'disabled',
        };
      } catch (err) {
        const error = err as AxiosError;

        return handleHttpError(error);
      }
    }
  },
};
