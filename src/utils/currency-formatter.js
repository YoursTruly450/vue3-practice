const usdFormatter = new Intl.NumberFormat('en-EN', { currency: 'USD', style: 'currency' });

export const currency = (value) => {
  return usdFormatter.format(value);
};