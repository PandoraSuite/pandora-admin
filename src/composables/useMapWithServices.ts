/**
 * Represents a service entity with its properties
 */
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

/**
 * Base interface for entities that contain a services array
 */
export interface EntityWithServices {
  services?: Service[] | null;
}

/**
 * Transforms entities by converting their services array into a formatted display string
 *
 * @template T - Entity type that extends EntityWithServices
 * @param sourceList - Array of entities containing services
 * @returns Array of entities with services formatted as strings
 */
export function useMapWithServices<T extends EntityWithServices>(
  sourceList: T[],
): T[] {
  return sourceList.map((entity) => ({
    ...entity,
    services: formatServices(entity.services),
  }));
}

/**
 * Formats an array of services into a comma-separated display string
 *
 * @param services - Array of services, or null/undefined
 * @returns Formatted service list or appropriate message
 *
 * @remarks
 * - If services array has items: returns "ServiceName - Version, ServiceName2 - Version2"
 * - If services array is empty: returns "There are no services available yet."
 * - If services is null/undefined: returns "Services unavailable."
 */
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
