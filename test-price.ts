import { formatPropertyPrice } from './src/utils/property-price';

const testData = [
  { amount: 150000, currency: 'Dólares' },
  { amount: 20000000, currency: 'Pesos' },
  { amount: 0, currency: 'USD' },
  null,
  undefined,
  { amount: 500 }, // no currency
  123456, // legacy number
];

testData.forEach(data => {
  console.log('Input:', data, '=> Output:', formatPropertyPrice(data));
});
