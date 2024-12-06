import { PaySlipItem } from '../interface';

function calculateTotals(data: PaySlipItem[]): { totalSalarial: string; totalPatronal: string } {
  const totalSalarial = data
    .reduce((total, item) => total + (Number(item.partSalariale?.amount) || 0), 0)
    .toFixed(2);

  const totalPatronal = data
    .reduce((total, item) => total + (Number(item.partPatronale?.amount) || 0), 0)
    .toFixed(2);

  return {
    totalSalarial,
    totalPatronal,
  };
}

export { calculateTotals };
