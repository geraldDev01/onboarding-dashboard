export interface Employee {
  id: string;
  name: string;
  email: string;
  department: Department;
  hireDate: string;
  country: Country;
  salary: number;
}

export interface EmployeeFilters {
  search: string;
  departments: Department[];
  countries: Country[];
}

export interface EmployeeSortConfig {
  field: keyof Employee;
  direction: 'asc' | 'desc';
}

export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Customer Support',
  'Product Management',
  'Design',
  'Legal'
] as const;

export const COUNTRIES = [
  'El Salvador',
  'Guatemala',
  'Nicaragua',
  'Honduras',
  'Costa Rica',
  'Panamá'
] as const;

export type Department = typeof DEPARTMENTS[number];
export type Country = typeof COUNTRIES[number];
