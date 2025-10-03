'use client';

import { Table } from '@/components/ui/Table';
import { allMockEmployees } from '@/data';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/types/employee';
import { useRouter } from 'next/navigation';
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

export default function EmployeesPage() {
  const router = useRouter();

  const handleRowClick = (employee: Employee) => {
    router.push(`/employees/${employee.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your organization&apos;s employees with sorting and search capabilities.
        </p>
      </div>
      
      <Table
        data={allMockEmployees}
        columns={employeeColumns}
        searchableFields={['name', 'email', 'department']}
        pageSize={10}
        onRowClick={handleRowClick}
      />
    </div>
  );
}