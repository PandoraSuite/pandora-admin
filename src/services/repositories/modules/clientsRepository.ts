import type { AxiosError, AxiosRequestConfig } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';
import type {
  Client,
  ClientFilterParams,
  NewClient,
} from '../../../types/clients';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/clients';

export interface ClientsRequests {
  getClients(
    params: ClientFilterParams | undefined,
  ): Promise<StandardResponse<Client[]>>;
  createClient(body: NewClient): Promise<StandardResponse<Client>>;
  getClientById(id: number): Promise<StandardResponse<Client>>;
}

export default <ClientsRequests>{
  async getClients(
    params: ClientFilterParams | undefined,
  ): Promise<StandardResponse<Client[]>> {
    const config: AxiosRequestConfig = params ? { params } : {};
    try {
      const response = await api.get<Client[]>(`${RESOURCE}`, config);
      // Access the backend response to capture 'created_at' and format it to local time and date.
      const processedResponse = response.data?.map((client) => ({
        ...client,
        created_at: datetimeFormatter.format(new Date(client.created_at)),
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

  async createClient(body: NewClient): Promise<StandardResponse<Client>> {
    try {
      const response = await api.post<Client>(`${RESOURCE}`, body);
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

  async getClientById(id: number): Promise<StandardResponse<Client>> {
    try {
      const response = await api.get<Client>(`${RESOURCE}/${id}`);
      const processedResponse = response.data;
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

  // async updateClient(id: number, body: UpdateClient): Promise<> {
  //   const response = await api.patch(`${RESOURCE}/clients/${id}`, body);
  //   return response;
  // }
};
