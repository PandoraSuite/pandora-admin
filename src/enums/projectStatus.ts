export enum ProjectStatus {
  IN_PRODUCTION = 'in_production',
  IN_DEVELOPMENT = 'in_development',
}

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.IN_PRODUCTION]: 'In Production',
  [ProjectStatus.IN_DEVELOPMENT]: 'In Development',
};
