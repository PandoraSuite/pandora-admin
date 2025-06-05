import type { Client } from './clients';
import type { Environment } from './environments';
import type { Project } from './projects';

export interface ClientProjectsLoadData {
  client: Client;
  clientProjects: Project[];
}

export interface ProjectEnvironmentsLoadData {
  client: Client;
  projectById: Project;
}

export interface EnvironmentAPiKeysLoadData {
  client: Client;
  projectById: Project;
  environmentById: Environment;
}
