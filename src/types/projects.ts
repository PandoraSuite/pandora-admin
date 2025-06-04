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

export interface ProjectToRender {
  id: number;
  name: string;
  client_id: string;
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

export interface FilteredProject {
  id: number;
  name: string;
  client_id: number;
  created_at: string;
  status: string;
}
export interface ProjectServices {
  assigned_at: string;
  id: number;
  max_request: number;
  name: string;
  next_reset: string;
  reset_frequency: string;
  version: string;
}

export interface ProjectServicesToRender {
  assigned_at: string;
  id: number;
  max_request: number | string;
  name: string;
  next_reset: string;
  reset_frequency: string;
  version: string;
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

export interface ProjectEnvironmentsToRender {
  created_at: string;
  id: number;
  name: string;
  project_id: string;
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

export interface UpdateProjectName {
  name: string;
}

export interface UpdateProjectServices {
  max_request?: number;
  next_reset?: string;
  reset_frequency?: string;
}
