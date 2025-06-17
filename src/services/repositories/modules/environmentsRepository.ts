import type { AxiosError } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';
import type { APIKey } from '../../../types/apiKeys';
import type {
  Environment,
  EnvironmentService,
  NewEnvironment,
  NewEnvironmentService,
  UpdateEnvironmentName,
  UpdateEnvironmentServices,
} from '../../../types/environments';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/environments';

export interface EnvironmentsRequests {
  createEnvironment(
    body: NewEnvironment,
  ): Promise<StandardResponse<Environment>>;
  getEnvironmentById(id: number): Promise<StandardResponse<Environment>>;
  getEnvironmentAPIKeys(id: number): Promise<StandardResponse<APIKey[]>>;
  assignEnvironmentService(
    id: number,
    body: NewEnvironmentService,
  ): Promise<StandardResponse<true>>;
  deleteEnvironmentService(
    id: number,
    service_id: number,
  ): Promise<StandardResponse<true>>;
  resetServiceQuota(
    id: number,
    service_id: number,
  ): Promise<StandardResponse<true>>;
  updateEnvironment(
    id: number,
    body: UpdateEnvironmentName,
  ): Promise<StandardResponse<Environment>>;
  updateEnvironmentService(
    environment_id: number,
    service_id: number,
    body: UpdateEnvironmentServices,
  ): Promise<StandardResponse<EnvironmentService>>;
  deleteEnvironment(id: number): Promise<StandardResponse<true>>;
}

export default <EnvironmentsRequests>{
  async createEnvironment(
    body: NewEnvironment,
  ): Promise<StandardResponse<Environment>> {
    try {
      const response = await api.post<Environment>(`${RESOURCE}`, body);
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

  async getEnvironmentById(id: number): Promise<StandardResponse<Environment>> {
    try {
      const response = await api.get<Environment>(`${RESOURCE}/${id}`);
      const processedResponse = response.data;
      // Access the backend response to capture 'created_at' and format it to local time and date.
      processedResponse.created_at = datetimeFormatter.format(
        new Date(processedResponse.created_at),
      );
      processedResponse.services = processedResponse.services.map(
        (service) => ({
          ...service,
          assigned_at: datetimeFormatter.format(new Date(service.assigned_at)),
        }),
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

  // Retrives the API keys of an environment by its id.
  async getEnvironmentAPIKeys(id: number): Promise<StandardResponse<APIKey[]>> {
    try {
      const response = await api.get<APIKey[]>(`${RESOURCE}/${id}/api-keys`);
      // Access the backend response to capture 'created_at' and format it to local time and date.
      const processedResponse = response.data?.map((APIKey) => ({
        ...APIKey,
        created_at: datetimeFormatter.format(new Date(APIKey.created_at)),
        last_used: datetimeFormatter.format(new Date(APIKey.last_used)),
        expires_at: datetimeFormatter.format(new Date(APIKey.expires_at)),
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

  // Assigns a service to an environment by its id.
  async assignEnvironmentService(
    id: number,
    body: NewEnvironmentService,
  ): Promise<StandardResponse<true>> {
    try {
      await api.post<true>(`${RESOURCE}/${id}/services`, body);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Deletes a service from an environment by its id.
  async deleteEnvironmentService(
    id: number,
    service_id: number,
  ): Promise<StandardResponse<true>> {
    try {
      await api.delete<true>(`${RESOURCE}/${id}/services/${service_id}`);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Resets the quota of a service in an environment by its id.
  async resetServiceQuota(
    environment_id: number,
    service_id: number,
  ): Promise<StandardResponse<true>> {
    try {
      await api.post<EnvironmentService>(
        `${RESOURCE}/${environment_id}/services/${service_id}/reset-requests`,
      );
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Updates an environment by its id.
  async updateEnvironment(
    id: number,
    body: UpdateEnvironmentName,
  ): Promise<StandardResponse<Environment>> {
    try {
      const response = await api.patch<Environment>(`${RESOURCE}/${id}`, body);
      const processedResponse = response.data;
      // Access the backend response to capture 'created_at' and format it to local time and date.
      processedResponse.created_at = datetimeFormatter.format(
        new Date(processedResponse.created_at),
      );
      processedResponse.services = processedResponse.services.map(
        (service) => ({
          ...service,
          assigned_at: datetimeFormatter.format(new Date(service.assigned_at)),
        }),
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

  async updateEnvironmentService(
    environment_id: number,
    service_id: number,
    body: UpdateEnvironmentServices,
  ): Promise<StandardResponse<EnvironmentService>> {
    try {
      const response = await api.patch<EnvironmentService>(
        `${RESOURCE}/${environment_id}/services/${service_id}`,
        body,
      );
      const processedResponse = response.data;
      // Access the backend response to capture 'assigned_at' and format it to local time and date.
      processedResponse.assigned_at = datetimeFormatter.format(
        new Date(processedResponse.assigned_at),
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

  // Deletes an environment by its id.
  async deleteEnvironment(id: number): Promise<StandardResponse<true>> {
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
