import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/clients/axios';

const resource: string = '/api/v1';

export interface Client {
  created_at: string;
  id: number;
  name: string;
  email: string;
  type: string;
}

export interface NewClient {
  name: string;
  email: string;
  type: string;
}

export interface ClientsRequests {
  getClients(): Promise<Client[]>;
  createClient(body: NewClient): Promise<Client>;
}

export default <ClientsRequests>{
  async getClients(): Promise<Client[]> {
    const response = await api.get<Client[]>(`${resource}/clients`);
    // Iterates the backend response to capture 'created_at' and format it to local time and date.
    const processedResponse = response.data.map((client) => ({
      ...client,
      created_at: datetimeFormatter.format(new Date(client.created_at)),
    }));
    return processedResponse;
  },

  async createClient(body: NewClient): Promise<Client> {
    const response = await api.post<Client>(`${resource}/clients`, body);
    const processedResponse = response.data;
    // Access the backend response to capture 'created_at' and format it to local time and date.
    processedResponse.created_at = datetimeFormatter.format(
      new Date(processedResponse.created_at),
    );
    return processedResponse;
  },
};
