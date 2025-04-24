import { datetimeFormatter } from '@composables/datetimeFormatter';
import api from '@services/clients/axios';

const resource: string = '/api/v1/clients';

export interface Client {
  created_at: string;
  id: number;
  name: string;
  email: string;
  type: string;
}

export interface ClientsRequests {
  getClients(): Promise<Client[]>;
}

export default <ClientsRequests>{
  async getClients(): Promise<Client[]> {
    const response = await api.get<Client[]>(`${resource}`);
    // Iterates the backend response to capture 'created_at' and format it to local time and date.
    const processedResponse = response.data.map((client) => ({
        ...client,
        created_at: datetimeFormatter.format(new Date(client.created_at)),
      }));
      return processedResponse;
  },
};
