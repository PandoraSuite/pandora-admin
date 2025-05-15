export interface Project {
  id: number;
  name: string;
  client_id: number;
  created_at: string;
  services: {
    assigned_at: string;
    id: number;
    max_request: number;
    name: string;
    next_reset: string;
    reset_frequency: string;
    version: string;
  }[];
  status: string;
}

export interface NewProject {
  client_id: number;
  name: string;
  services: {
    id: number;
    max_request: number;
    reset_frequency: string;
  }[];
  status: string;
}

export interface ClientProjects {
  id: number;
  name: string;
  client_id: number;
  created_at: string;
  services: {
    name: string;
    version: string;
  }[];
  status: string;
}

export interface NewProjectService {
  id: number;
  max_request: number;
  reset_frequency: string;
}

export interface ProjectEnviroments {
  created_at: string;
  id: 0;
  name: string;
  project_id: 0;
  services: {
    assigned_at: string;
    available_request: 0;
    id: 0;
    max_request: 0;
    name: string;
    version: string;
  }[];
  status: string;
}
