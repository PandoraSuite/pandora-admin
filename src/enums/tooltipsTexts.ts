export enum TooltipMessages {
  seeAPIKey = 'seeAPIKey',
  deleteAPIKey = 'deleteAPIKey',
  editModalTitle = 'editModalTitle',
  refreshService = 'refreshService',
  removeService = 'removeService',
  seeProject = 'seeProject',
  deleteProject = 'deleteProject',
  seeClient = 'seeClient',
  deleteClient = 'deleteClient',
  deleleService = 'deleteService',
}

export const TooltipMessagesLabels: Record<TooltipMessages, string> = {
  [TooltipMessages.seeAPIKey]: 'See API key.',
  [TooltipMessages.deleteAPIKey]: 'Delete API key.',
  [TooltipMessages.editModalTitle]: 'Edit',
  [TooltipMessages.refreshService]: 'Refresh service.',
  [TooltipMessages.removeService]: 'Remove service.',
  [TooltipMessages.seeProject]: 'See project.',
  [TooltipMessages.deleteProject]: 'Delete project.',
  [TooltipMessages.seeClient]: 'See client.',
  [TooltipMessages.deleteClient]: 'Delete client.',
  [TooltipMessages.deleleService]: 'Delete service.',
};
