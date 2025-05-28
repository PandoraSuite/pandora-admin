export enum ServiceType {
  environment = 'environment',
  project = 'project',
}

export const ServiceTypeLabels: Record<ServiceType, string> = {
  [ServiceType.environment]: 'Environment',
  [ServiceType.project]: 'Project',
};
