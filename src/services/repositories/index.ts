import authRepository, { type AuthRequests } from './modules/authRepository';

import servicesRepository, {
  type ServicesRequests,
} from './modules/servicesRepository';

import clientsRepository, {
  type ClientsRequests,
} from './modules/clientsRepository';

import projectsRepository, {
  type ProjectsRequests,
} from './modules/projectsRepository';

import environmentsRepository, {
  type EnvironmentsRequests,
} from './modules/environmentsRepository';

import apiKeysRepository, {
  type APIKeyRequests,
} from './modules/apiKeysRepository';

export interface Repositories {
  auth: AuthRequests;
  services: ServicesRequests;
  clients: ClientsRequests;
  projects: ProjectsRequests;
  environments: EnvironmentsRequests;
  apiKeys: APIKeyRequests;
}

export const repositories: Repositories = {
  auth: authRepository,
  services: servicesRepository,
  clients: clientsRepository,
  projects: projectsRepository,
  environments: environmentsRepository,
  apiKeys: apiKeysRepository,
};
