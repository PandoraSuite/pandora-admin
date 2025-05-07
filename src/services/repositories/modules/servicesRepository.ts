import type { AxiosError, AxiosRequestConfig } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';
import type {
  NewService,
  Service,
  ServiceFilterParams,
} from '../../../types/services';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/services';

export interface ServicesRequests {
  getServices(
    params?: ServiceFilterParams,
  ): Promise<StandardResponse<Service[]>>;
  createService(body: NewService): Promise<StandardResponse<Service>>;
}

export default <ServicesRequests>{
  async getServices(
    params?: ServiceFilterParams | undefined,
  ): Promise<StandardResponse<Service[]>> {
    const config: AxiosRequestConfig = params ? { params } : {};
    try {
      const response = await api.get<Service[]>(`${RESOURCE}`, config);
      // Iterates the backend response to capture 'created_at' and format it to local time and date.
      const processedResponse = response.data.map((service) => ({
        ...service,
        created_at: datetimeFormatter.format(new Date(service.created_at)),
      }));
      return {
        success: true,
        data: processedResponse,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  async createService(body: NewService): Promise<StandardResponse<Service>> {
    try {
      const response = await api.post<Service>(`${RESOURCE}`, body);
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
};
