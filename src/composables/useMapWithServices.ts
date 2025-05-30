interface Service {
  available_request?: number;
  assigned_at: string;
  id: number;
  max_request?: number;
  name: string;
  next_reset?: string;
  reset_frequency?: string;
  version: string;
}

export interface EntityWithServices {
  services?: Service[] | null;
}

export function useMapWithServices<T extends EntityWithServices>(
  sourceList: T[],
): T[] {
  return sourceList.map((entity) => ({
    ...entity,
    services: formatServices(entity.services),
  }));
}

function formatServices(services: Service[] | null | undefined): string {
  if (Array.isArray(services) && services.length > 0) {
    const serviceStrings = services.map((service) => {
      return `${service.name} - ${service.version}`;
    });

    return serviceStrings.join(', ');
  } else if (Array.isArray(services) && services.length === 0) {
    return 'There are no services available yet.';
  } else {
    return 'Services unavailable.';
  }
}
