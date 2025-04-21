import servicesRepository, {
  type ServicesRequests,
} from './servicesRepository';

import authRepository, { type AuthRequests } from './authRepository';

export interface Repositories {
  services: ServicesRequests;
  auth: AuthRequests;
}

export const repositories: Repositories = {
  services: servicesRepository,
  auth: authRepository,
};
