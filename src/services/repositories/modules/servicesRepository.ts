import type { AxiosError, AxiosRequestConfig } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';
import type {
  NewService,
  Service,
  ServiceFilterParams,
  ServiceRequestsHistory,
  ServiceRequestsHistoryResponse,
  UpdateServiceStatus,
} from '../../../types/services';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/services';

export interface ServicesRequests {
  getServices(
    params?: ServiceFilterParams,
  ): Promise<StandardResponse<Service[]>>;
  createService(body: NewService): Promise<StandardResponse<Service>>;
  updateServiceStatus(
    id: number,
    body: UpdateServiceStatus,
  ): Promise<StandardResponse<Service>>;
  getServiceRequestsHistory(
    id: number,
    params?: ServiceRequestsHistory,
  ): Promise<StandardResponse<ServiceRequestsHistoryResponse[]>>;
  deleteService(id: number): Promise<StandardResponse<true>>;
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

  async updateServiceStatus(
    id: number,
    body: UpdateServiceStatus,
  ): Promise<StandardResponse<Service>> {
    try {
      const response = await api.patch<Service>(
        `${RESOURCE}/${id}/status`,
        body,
      );
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

  async getServiceRequestsHistory(
    id: number,
    params?: ServiceRequestsHistory,
  ): Promise<StandardResponse<ServiceRequestsHistoryResponse[]>> {
    const config: AxiosRequestConfig = params ? { params } : {};
    try {
      const response = await api.get<ServiceRequestsHistoryResponse[]>(
        `${RESOURCE}/${id}/requests`,
        config,
      );
      // Iterates the backend response to capture 'created_at' and format it to local time and date.
      const processedResponse = response.data.map((request) => ({
        ...request,
        created_at: datetimeFormatter.format(new Date(request.created_at)),
        request_time: datetimeFormatter.format(new Date(request.request_time)),
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

  async deleteService(id: number): Promise<StandardResponse<true>> {
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
};
