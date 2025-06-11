export interface Client {
  id: number;
  name: string;
  type: string;
  email: string;
  created_at: string;
}

export interface NewClient {
  name: string;
  type: string;
  email: string;
}

export interface UpdateClient {
  name?: string;
  type?: string;
  email?: string;
}

export interface ClientPayload {
  name: string;
  type: string;
  email: string;
}

export interface ClientProjects {
  client_id: number;
  created_at: string;
  id: number;
  name: string;
  services: {
    assigned_at: string;
    id: number;
    max_requests: number;
    name: string;
    next_reset: string;
    reset_frequency: string;
    version: string;
  }[];
  status: string;
}

export interface ClientFilterParams {
  type?: string;
}
