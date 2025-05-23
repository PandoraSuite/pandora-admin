export enum ResetServiceFrequency {
  daily = 'daily',
  biweekly = 'biweekly',
  weekly = 'weekly',
  monthly = 'monthly',
}

export const ResetServiceFrequencyLabels: Record<
  ResetServiceFrequency,
  string
> = {
  [ResetServiceFrequency.daily]: 'Daily',
  [ResetServiceFrequency.biweekly]: 'Biweekly',
  [ResetServiceFrequency.weekly]: 'Weekly',
  [ResetServiceFrequency.monthly]: 'Monthly',
};
