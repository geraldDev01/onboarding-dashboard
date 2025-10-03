import { DateTime } from 'luxon';

export const formatHireDate = (dateString: string): string => {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_FULL);
};

export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};
