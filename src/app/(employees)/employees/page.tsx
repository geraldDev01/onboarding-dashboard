'use client';

import { useState } from 'react';
import { Table, Modal, Button } from '@/components/ui';
import { CreateEmployeeForm } from '@/components/forms/CreateEmployeeForm';
import { allMockEmployees } from '@/data';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/types/employee';
import { CreateEmployeeData } from '@/schemas/createEmployeeSchema';
import { useRouter } from 'next/navigation';
import { formatHireDate, formatCurrency } from '@/utils';
import { Plus } from 'lucide-react';
import { toastHelpers } from '@/components/ui/Toast';
import { createEmployeeAction } from '@/app/actions/employess';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRowClick = (employee: Employee) => {
    router.push(`/employees/${employee.id}`);
  };

  const handleCreateEmployee = async (data: CreateEmployeeData) => {
    setIsCreating(true);
    setError(null);
    
    try {
      console.log('Creating employee:', data);
      const newEmployee = await createEmployeeAction(data);
      
      console.log('Employee created:', newEmployee);
      setIsModalOpen(false);
      setError(null);
      
      // Success toast notification
      toastHelpers.success(
        `Employee ${newEmployee.name} created successfully!`,
        { duration: 4000 }
      );
      
    } catch (err) {
      console.error('Failed to create employee:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to create employee. Please try again.';
      
      setError(errorMessage);
      
      // Error toast notification
      toastHelpers.error(errorMessage, { duration: 6000 });
    } finally {
      setIsCreating(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600 mt-2">
              Manage your organization&apos;s employees with sorting and search capabilities.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Employee
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create New Employee"
        size="xl"
      >
        <CreateEmployeeForm
          onSubmit={handleCreateEmployee}
          isLoading={isCreating}
          error={error || undefined}
        />
      </Modal>
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