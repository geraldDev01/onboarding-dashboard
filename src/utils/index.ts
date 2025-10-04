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

import type { CreateEmployeeData } from '@/schemas/createEmployeeSchema';

// Draft/Form localStorage utilities
export const DRAFT_KEY = 'employee-form-draft';

export const saveDraftToLocalStorage = (formData: Partial<CreateEmployeeData>): void => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  } catch (error) {
    console.warn('Failed to save draft to localStorage:', error);
  }
};

export const loadDraftFromLocalStorage = (): Partial<CreateEmployeeData> | null => {
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.warn('Failed to load draft from localStorage:', error);
    return null;
  }
};

export const clearDraftFromLocalStorage = (): void => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    console.warn('Failed to clear draft from localStorage:', error);
  }
};
