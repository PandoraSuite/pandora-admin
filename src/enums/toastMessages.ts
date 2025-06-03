export enum ToastMessages {
  isSuccess = 'success',
  isError = 'error',
  serviceAssigned = 'serviceAssigned',
  apiKeyCreated = 'apiKeyCreated',
  environmentCreated = 'environmentCreated',
  projectCreated = 'projectCreated',
  serviceCreated = 'serviceCreated',
  clientCreated = 'clientCreated',
  sessionExpired = 'sessionExpired',
}

export const ToastMessagesLabels: Record<ToastMessages, string> = {
  [ToastMessages.isSuccess]: 'success',
  [ToastMessages.isError]: 'error',
  [ToastMessages.serviceAssigned]: 'Service assigned successfully.',
  [ToastMessages.apiKeyCreated]: 'API key created successfully.',
  [ToastMessages.environmentCreated]: 'Environment created successfully.',
  [ToastMessages.projectCreated]: 'Project created successfully.',
  [ToastMessages.serviceCreated]: 'Service created successfully.',
  [ToastMessages.clientCreated]: 'Client created successfully',
  [ToastMessages.sessionExpired]: 'Session expired. Please log in again.',
};
