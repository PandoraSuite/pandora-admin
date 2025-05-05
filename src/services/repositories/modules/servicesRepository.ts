import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/api';

const RESOURCE: string = '/api/v1';

export interface Service {
  created_at: string;
  id: number;
  name: string;
  status: string;
  version: string;
}

export interface NewService {
  name: string;
  version: string;
}

export interface ServiceFilterParams {
  status?: string;
}

export interface ServicesRequests {
  getServices(params?: ServiceFilterParams): Promise<Service[]>;
  createService(body: NewService): Promise<Service>;
}

export default <ServicesRequests>{
  async getServices(params?: ServiceFilterParams): Promise<Service[]> {
    const response = await api.get<Service[]>(`${RESOURCE}/services`, {
      params,
    });
    // Iterates the backend response to capture 'created_at' and format it to local time and date.
    const processedResponse = response.data.map((service) => ({
      ...service,
      created_at: datetimeFormatter.format(new Date(service.created_at)),
    }));
    return processedResponse;
  },

  async createService(body: NewService): Promise<Service> {
    const response = await api.post<Service>(`${RESOURCE}/services`, body);
    const processedResponse = response.data;
    // Access the backend response to capture 'created_at' and format it to local time and date.
    processedResponse.created_at = datetimeFormatter.format(
      new Date(processedResponse.created_at),
    );
    return processedResponse;
  },
};
