/**
 * Utility to format property prices according to the "Propietas" policy:
 * 1. If amount > 0, display "Currency Amount" (e.g., "USD 150.000").
 * 2. If amount is missing or <= 0, display "Consultar".
 * 3. Normalizes currency names: "Pesos" -> "ARS", "Dólares" -> "USD".
 */
export const formatPropertyPrice = (
  priceData: any, 
  defaultCurrency: string = 'USD'
): string => {
  // Return early if no data
  if (!priceData) return 'Consultar';

  let amount: number | undefined;
  let currency: string | undefined;

  // Handle object structure { amount, currency }
  if (typeof priceData === 'object') {
    amount = priceData.amount;
    currency = priceData.currency;
  } else if (typeof priceData === 'number') {
    // Fallback for legacy number fields
    amount = priceData;
    currency = defaultCurrency;
  }

  // Final check for positive amount
  if (amount != null && amount > 0) {
    // Normalization
    let normalizedCurrency = currency || defaultCurrency;
    
    // Handle cases where currency might be an object { name, symbol, etc }
    if (normalizedCurrency && typeof normalizedCurrency === 'object') {
      normalizedCurrency = (normalizedCurrency as any).name || (normalizedCurrency as any).code || (normalizedCurrency as any).symbol || defaultCurrency;
    }

    if (normalizedCurrency === 'Pesos') normalizedCurrency = 'ARS';
    if (normalizedCurrency === 'Dólares') normalizedCurrency = 'USD';
    
    // Formatting
    const formattedAmount = amount.toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    return `${normalizedCurrency} ${formattedAmount}`;
  }

  return 'Consultar';
};

/**
 * Specifically for listing items where we might have separate sale/rent objects
 */
export const getPropertyPriceDisplay = (item: any, type: 'sale' | 'rent' = 'sale'): string => {
  if (!item) return 'Consultar';
  
  const priceData = type === 'sale' ? item.valueForSale : item.valueForRent;
  const isPublished = type === 'sale' ? item.publishForSale : item.publishForRent;
  
  if (!isPublished) return 'Consultar';
  
  return formatPropertyPrice(priceData, type === 'sale' ? 'USD' : 'ARS');
};
