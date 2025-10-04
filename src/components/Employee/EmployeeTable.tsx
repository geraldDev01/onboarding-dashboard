'use client';

import { useRouter } from 'next/navigation';
import { Table } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/types/employee';
import { formatHireDate, formatCurrency } from '@/utils';

const employeeColumns: ColumnDef<Employee>[] = [
  { 
    accessorKey: 'name', 
    header: 'NAME',
    enableSorting: true,
  },
  { 
    accessorKey: 'email', 
    header: 'EMAIL',
    enableSorting: false,
  },
  { 
    accessorKey: 'department', 
    header: 'DEPARTMENT',
    enableSorting: false,
  },
  { 
    accessorKey: 'hireDate', 
    header: 'HIRE DATE',
    enableSorting: true,
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return formatHireDate(date);
    },
  },
  { 
    accessorKey: 'country', 
    header: 'COUNTRY',
    enableSorting: false,
  },
  { 
    accessorKey: 'salary', 
    header: 'SALARY',
    enableSorting: true,
    cell: ({ getValue }) => {
      const salary = getValue() as number;
      return formatCurrency(salary);
    },
  },
];

interface EmployeeTableProps {
  employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const router = useRouter();

  const handleRowClick = (employee: Employee) => {
    router.push(`/employees/${employee.id}`);
  };

  return (
    <Table
      data={employees}
      columns={employeeColumns}
      searchableFields={['name', 'email', 'department']}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  );
}
