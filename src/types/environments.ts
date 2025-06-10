export interface Environment {
  created_at: string;
  id: number;
  name: string;
  project_id: number;
  services: {
    assigned_at: string;
    available_request: number;
    id: number;
    max_requests: number;
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
    max_requests: number;
  }[];
}

export interface EnvironmentService {
  assigned_at: string;
  available_request: number;
  id: number;
  max_requests: number;
  name: string;
  version: string;
}

export interface EnvironmentServiceToRender {
  assigned_at: string;
  available_request: number | string;
  id: number;
  max_requests: number | string;
  name: string;
  version: string;
}

export interface NewEnvironmentService {
  id: number;
  max_requests: number;
}

export interface FilteredEnvironment {
  created_at: string;
  id: number;
  name: string;
  project_id: number;
  status: string;
}
