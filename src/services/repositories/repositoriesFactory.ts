import authRepository, { type AuthRequests } from './authRepository';

import servicesRepository, {
  type ServicesRequests,
} from './servicesRepository';

import clientsRepository, { type ClientsRequests } from './clientsRepository';

export interface Repositories {
  auth: AuthRequests;
  services: ServicesRequests;
  clients: ClientsRequests;
}

export const repositories: Repositories = {
  auth: authRepository,
  services: servicesRepository,
  clients: clientsRepository,
};
