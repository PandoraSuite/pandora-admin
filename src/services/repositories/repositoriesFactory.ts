import servicesRepository, {
  type ServicesRequests,
} from './servicesRepository';

export interface Repositories {
  services: ServicesRequests;
}

export const repositories: Repositories = {
  services: servicesRepository,
};
