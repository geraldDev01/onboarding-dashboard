'use client';

import { useParams, useRouter } from 'next/navigation';
import { allMockEmployees } from '@/data';
import { Employee } from '@/types/employee';
import { Button, Card, InfoCard } from '@/components/ui';
import { ArrowLeft, Mail, Building2, Calendar, MapPin, DollarSign, User } from 'lucide-react';
import { formatHireDate, formatCurrency } from '@/utils';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id;

  // Find the employee by ID
  const employee: Employee | undefined = allMockEmployees.find(emp => emp.id === employeeId);

  if (!employee) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h1>
          <p className="text-gray-600 mb-6">The employee you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/employees')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to list
          </Button>
        </div>
      </div>
    );
  }
  const formattedHireDate = formatHireDate(employee.hireDate);
  const formattedSalary = formatCurrency(employee.salary);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={() => router.push('/employees')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to list
        </Button>
      </div>

      {/* Employee Details Card - Centered */}
      <div className="flex justify-center">
        <Card className="max-w-4xl w-full">
          <div className="p-8">
            {/* Employee Header */}
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-6">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-lg text-gray-600">{employee.email}</p>
                <p className="text-sm text-gray-500">ID: {employee.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard
                icon={Building2}
                label="Department"
                value={employee.department}
              />
              <InfoCard
                icon={MapPin}
                label="Country"
                value={employee.country}
              />
              <InfoCard
                icon={Calendar}
                label="Hire Date"
                value={formattedHireDate}
              />
              <InfoCard
                icon={DollarSign}
                label="Salary"
                value={formattedSalary}
              />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <InfoCard
                icon={Mail}
                label="Email Address"
                value={employee.email}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
