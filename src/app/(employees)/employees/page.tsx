"use server";
import { allMockEmployees } from '@/data';
import { Employee } from '@/types/employee';
import { getEmployeesAction } from '@/app/actions/employess';
import { AddEmployeeButton } from '@/components/Employee/AddEmployeeButton';
import { EmployeeTable } from '@/components/Employee/EmployeeTable';

export default async function EmployeesPage() {
  // Fetch server-side data
  const serverEmployees = await getEmployeesAction();
  const allEmployees: Employee[] = [...serverEmployees, ...allMockEmployees];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600 mt-2">
              Manage your organization&apos;s employees with sorting and search capabilities.
            </p>
          </div>
          <AddEmployeeButton />
        </div>
      </div>
      <EmployeeTable employees={allEmployees} />
    </div>
  );
}