export enum TitleMessages {
  service = 'service',
  serviceStatus = 'serviceStatus',
  apiKey = 'apiKey',
  project = 'project',
  client = 'client',
  environment = 'environment',
  reauthenticate = 'reauthenticate',
  apiKeyVisible = 'apiKeyVisible',
}

export const TitleMessagesLabels: Record<TitleMessages, string> = {
  [TitleMessages.service]: 'service',
  [TitleMessages.serviceStatus]: 'service status',
  [TitleMessages.apiKey]: 'API key',
  [TitleMessages.project]: 'project',
  [TitleMessages.client]: 'client',
  [TitleMessages.environment]: 'environment',
  [TitleMessages.reauthenticate]:
    'Please enter your password to confirm your identity.',
  [TitleMessages.apiKeyVisible]: 'This is the API key:',
};
