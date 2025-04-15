import api from '../clients/axios';

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
    return response.data;
  },

  async createService(body: NewService): Promise<Service> {
    const response = await api.post<Service>(`${resource}/services`, body);
    return response.data;
  },
};
