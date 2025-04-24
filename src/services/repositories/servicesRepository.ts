import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/clients/axios';

const resource: string = '/api/v1';

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

export interface ServicesRequests {
  getServices(): Promise<Service[]>;
  createService(body: NewService): Promise<Service>;
}

export default <ServicesRequests>{
  async getServices(): Promise<Service[]> {
    const response = await api.get<Service[]>(`${resource}/services`);
    // Iterates the backend response to capture 'created_at' and format it to local time and date.
    const processedResponse = response.data.map((service) => ({
      ...service,
      created_at: datetimeFormatter.format(new Date(service.created_at)),
    }));
    return processedResponse;
  },

  async createService(body: NewService): Promise<Service> {
    const response = await api.post<Service>(`${resource}/services`, body);
    return response.data;
  },
};
