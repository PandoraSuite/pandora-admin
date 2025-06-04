import type { AxiosError } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';
import type { APIKey, NewAPIKey, UpdateAPIKey } from '../../../types/apiKeys';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/api-keys';

export interface APIKeyRequests {
  createAPIKey(body: NewAPIKey): Promise<StandardResponse<APIKey>>;
  updateAPIKey(
    id: number,
    body: UpdateAPIKey,
  ): Promise<StandardResponse<APIKey>>
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
};
