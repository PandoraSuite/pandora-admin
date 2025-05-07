import authRepository, { type AuthRequests } from './modules/authRepository';

import servicesRepository, {
  type ServicesRequests,
} from './modules/servicesRepository';

import clientsRepository, {
  type ClientsRequests,
} from './modules/clientsRepository';

import type { ProjectsRequests } from './modules/projectsRepository';
import projectsRepository from './modules/projectsRepository';

export interface Repositories {
  auth: AuthRequests;
  services: ServicesRequests;
  clients: ClientsRequests;
  projects: ProjectsRequests;
}

export const repositories: Repositories = {
  auth: authRepository,
  services: servicesRepository,
  clients: clientsRepository,
  projects: projectsRepository,
};
