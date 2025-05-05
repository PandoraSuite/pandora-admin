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

export interface ClientFilterParams {
  type?: string;
}
