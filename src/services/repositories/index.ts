import authRepository, { type AuthRequests } from './modules/authRepository';

import servicesRepository, {
  type ServicesRequests,
} from './modules/servicesRepository';

import clientsRepository, {
  type ClientsRequests,
} from './modules/clientsRepository';

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
