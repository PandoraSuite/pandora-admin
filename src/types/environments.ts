export interface Environment {
  created_at: string;
  id: number;
  name: string;
  project_id: number;
  services: {
    assigned_at: string;
    available_request: number;
    id: number;
    max_request: number;
    name: string;
    version: string;
  }[];
  status: string;
}

export interface NewEnvironment {
  name: string;
  project_id: number;
  services: {
    id: number;
    max_request: number;
  }[];
}

export interface EnvironmentService {
  assigned_at: string;
  available_request: number;
  id: number;
  max_request: number;
  name: string;
  version: string;
}

export interface NewEnvironmentService {
  id: number;
  max_request: number;
}
