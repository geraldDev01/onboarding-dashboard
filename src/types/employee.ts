export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  hireDate: string;
  country: string;
  salary: number;
}

export interface EmployeeFilters {
  search: string;
  departments: string[];
  countries: string[];
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
  'United States',
  'Canada',
  'Mexico',
  'Brazil',
  'Argentina',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Japan',
  'South Korea',
  'China',
  'India',
  'Australia',
  'New Zealand'
] as const;
