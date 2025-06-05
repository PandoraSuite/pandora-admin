export enum TitleMessages {
  service = 'service',
  serviceStatus = 'serviceStatus',
  apiKey = 'apiKey',
  project = 'project',
  client = 'client',
  environment = 'environment',
}

export const TitleMessagesLabels: Record<TitleMessages, string> = {
  [TitleMessages.service]: 'service',
  [TitleMessages.serviceStatus]: 'service status',
  [TitleMessages.apiKey]: 'API key',
  [TitleMessages.project]: 'project',
  [TitleMessages.client]: 'client',
  [TitleMessages.environment]: 'environment',
};
