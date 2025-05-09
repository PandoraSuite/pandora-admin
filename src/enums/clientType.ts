export enum ClientType {
  organization = 'organization',
  developer = 'developer',
}

export const ClientTypeLabels: Record<ClientType, string> = {
  [ClientType.organization]: 'Organization',
  [ClientType.developer]: 'Developer',
};
