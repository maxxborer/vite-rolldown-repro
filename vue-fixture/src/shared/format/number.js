export const formatNumber = (value, locale = 'en-US') => new Intl.NumberFormat(locale).format(value);
export const formatCurrency = (value, locale = 'en-US') => new Intl.NumberFormat(locale, {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(value);
