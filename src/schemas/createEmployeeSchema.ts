import { z } from 'zod';
import { DateTime } from 'luxon';
import { DEPARTMENTS, COUNTRIES } from '@/types/employee';

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must have at least 3 characters')
    .min(1, 'Full name is required'),
  email: z
    .email('Invalid email format')
    .refine((val) => val.endsWith('@rebuhr.com'), {
      message: 'Email must use the domain @rebuhr.com',
    }),
  department: z.enum(DEPARTMENTS, {
    message: 'Must select a department',
  }),
  hireDate: z
    .string()
    .min(1, 'Hire date is required')
    .refine((dateString) => {
      const hireDate = DateTime.fromISO(dateString);
      const today = DateTime.now().startOf('day');

      return hireDate.isValid && hireDate >= today;
    }, 'Hire date cannot be before today'),
  salary: z
    .number()
    .min(800, 'Minimum salary is $800')
    .max(10000, 'Maximum salary is $10,000'),
  country: z.enum(COUNTRIES, {
    message: 'Must select a country',
  }),
});

export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>;