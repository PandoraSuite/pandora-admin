export enum ServiceRequests {
  unlimited = 'unlimited',
  none = 'none',
}

export const ServiceRequestsLabels: Record<ServiceRequests, string> = {
  [ServiceRequests.unlimited]: 'unlimited',
  [ServiceRequests.none]: 'none',
};
