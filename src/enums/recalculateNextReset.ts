export enum RecalculateNextReset {
  yes = 1,
  no = 0,
}

export const RecalculateNextResetLabels: Record<RecalculateNextReset, string> = {
  [RecalculateNextReset.yes]: 'Yes.',
  [RecalculateNextReset.no]: 'No.',
};
