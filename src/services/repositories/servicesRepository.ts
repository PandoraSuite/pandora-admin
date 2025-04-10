import api from "../clients/axios";

const resource: string = "/api/v1";


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

export default {
  getServices: async (): Promise<Service[]> => {
    const response = await api.get<Service[]>(`${resource}/services`);
    return response.data;
  },
  
  createService: async (body: NewService): Promise<Service> => {
    const response = await api.post<Service>(`${resource}/services`, body);
    return response.data;
  },
}

