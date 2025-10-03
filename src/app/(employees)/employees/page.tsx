'use client';

import { Table } from '@/components/ui/Table';
import { allMockEmployees } from '@/data';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/types/employee';
import { useRouter } from 'next/navigation';

const employeeColumns: ColumnDef<Employee>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'hireDate', header: 'Hire Date' },
  { accessorKey: 'country', header: 'Country' },
  { accessorKey: 'salary', header: 'Salary' },
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