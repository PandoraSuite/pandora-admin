export enum ServicesStatus {
  enabled = 'enabled',
  disabled = 'disabled',
  deprecated = 'deprecated',
}

export const ServicesStatusLabels: Record<ServicesStatus, string> = {
  [ServicesStatus.enabled]: 'Enabled',
  [ServicesStatus.disabled]: 'Disabled',
  [ServicesStatus.deprecated]: 'Deprecated',
};
