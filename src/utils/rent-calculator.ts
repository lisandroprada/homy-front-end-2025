/**
 * Cálculo de costos de alquiler para el inquilino (locatario).
 * Misma cuenta que rentia-backoffice/utils/rentCalculator.ts (calcContractBreakdown), recortada a lo que ve el inquilino.
 * Valores por defecto = defaults del backoffice (contract settings); confirmar con el corredor antes de cambiarlos.
 */

export const RENT_CONTRACT_MONTHS = 24;
export const RENT_INDEX_LABEL = 'ICL (BCRA)';
export const RENT_ADJUSTMENT_OPTIONS = [3, 4, 6] as const;
export const RENT_DEPOSIT_MONTHS = 1;
export const RENT_TENANT_FEE_PCT = 2;

export interface TenantCostBreakdown {
  contractTotal: number;
  deposit: number;
  fee: number;
  upfront: number;
}

export function calcTenantCosts(monthlyRent: number): TenantCostBreakdown {
  // Con ICL el total real depende del índice: se estima con alquiler fijo, igual que el backoffice.
  const contractTotal = monthlyRent * RENT_CONTRACT_MONTHS;
  const deposit = monthlyRent * RENT_DEPOSIT_MONTHS;
  const fee = Math.round(contractTotal * (RENT_TENANT_FEE_PCT / 100) * 100) / 100;
  return {contractTotal, deposit, fee, upfront: monthlyRent + deposit + fee};
}

export function formatMoney(amount: number, currency: string): string {
  return `${currency} ${Math.round(amount).toLocaleString('es-AR')}`;
}
