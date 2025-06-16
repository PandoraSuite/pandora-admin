import type { AxiosError, AxiosRequestConfig } from 'axios';

import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';
import type {
  Client,
  ClientFilterParams,
  ClientProjects,
  NewClient,
  UpdateClient,
} from '../../../types/clients';
import { handleHttpError } from '../errors/handler';
import type { StandardResponse } from '../types/response';

const RESOURCE: string = '/api/v1/clients';

export interface ClientsRequests {
  getClients(
    params: ClientFilterParams | undefined,
  ): Promise<StandardResponse<Client[]>>;
  createClient(body: NewClient): Promise<StandardResponse<Client>>;
  updateClient(id: number, body: UpdateClient): Promise<StandardResponse<true>>;
  getClientById(id: number): Promise<StandardResponse<Client>>;
  getClientProjects(id: number): Promise<StandardResponse<ClientProjects[]>>;
  deleteClient(id: number): Promise<StandardResponse<true>>;
}

export default <ClientsRequests>{
  // Fetches a list of clients with optional filtering parameters.
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

  // Creates a new client.
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

  // Fetches a client by ID.
  async getClientById(id: number): Promise<StandardResponse<Client>> {
    try {
      const response = await api.get<Client>(`${RESOURCE}/${id}`);
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

  // Updates an existing client by ID.
  async updateClient(
    id: number,
    body: UpdateClient,
  ): Promise<StandardResponse<true>> {
    try {
      await api.patch<true>(`${RESOURCE}/${id}`, body);
      return {
        success: true,
      };
    } catch (err) {
      const error = err as AxiosError;

      return handleHttpError(error);
    }
  },

  // Fetches projects associated with a specific client by ID.
  async getClientProjects(
    id: number,
  ): Promise<StandardResponse<ClientProjects[]>> {
    try {
      const response = await api.get<ClientProjects[]>(
        `${RESOURCE}/${id}/projects`,
      );
      // Access the backend response to capture 'created_at' and format it to local time and date.
      const processedResponse = response.data?.map((project) => ({
        ...project,
        created_at: datetimeFormatter.format(new Date(project.created_at)),
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

  // Deletes a client by ID.
  async deleteClient(id: number): Promise<StandardResponse<true>> {
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
