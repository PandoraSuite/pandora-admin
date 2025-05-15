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

export interface UpdateService {
  name?: string;
  version?: string;
}

export interface ServicePayload {
  name: string;
  version: string;
}

export interface ServiceFilterParams {
  status?: string;
}
