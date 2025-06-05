export enum ServicesStatus {
  active = 'active',
  deactivated = 'deactivated',
  deprecated = 'deprecated',
}

export const ServicesStatusLabels: Record<ServicesStatus, string> = {
  [ServicesStatus.active]: 'Active',
  [ServicesStatus.deactivated]: 'Deactivated',
  [ServicesStatus.deprecated]: 'Deprecated',
};
