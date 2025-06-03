export enum ToastMessages {
  isSuccess = 'success',
  isError = 'error',
  serviceAssigned = 'serviceAssigned',
  serviceCreated = 'serviceCreated',
  serviceStatusUpdated = 'serviceStatusUpdated',
  serviceDeleted = 'serviceDeleted',
  clientCreated = 'clientCreated',
  projectCreated = 'projectCreated',
  environmentCreated = 'environmentCreated',
  apiKeyCreated = 'apiKeyCreated',
  sessionExpired = 'sessionExpired',
}

export const ToastMessagesLabels: Record<ToastMessages, string> = {
  [ToastMessages.isSuccess]: 'success',
  [ToastMessages.isError]: 'error',
  [ToastMessages.serviceAssigned]: 'Service assigned successfully.',
  [ToastMessages.serviceCreated]: 'Service created successfully.',
  [ToastMessages.serviceStatusUpdated]: 'Service updated successfully.',
  [ToastMessages.serviceDeleted]: 'Service deleted successfully.',
  [ToastMessages.clientCreated]:  'Client created successfully.',
  [ToastMessages.projectCreated]: 'Project created successfully.',
  [ToastMessages.environmentCreated]: 'Environment created successfully.',
  [ToastMessages.apiKeyCreated]: 'API key created successfully.',
  [ToastMessages.sessionExpired]: 'Session expired. Please log in again.',
};
