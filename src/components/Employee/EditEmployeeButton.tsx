'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Modal, Button } from '@/components/ui';
import { CreateEmployeeForm } from '@/components/forms/CreateEmployeeForm';
import { Employee } from '@/types/employee';
import { toastHelpers } from '@/components/ui/Toast';

interface EditEmployeeButtonProps {
  employee: Employee;
}

export function EditEmployeeButton({ employee }: EditEmployeeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async (data: unknown) => {
    const employeeData = data as Employee;
    
    toastHelpers.info(
      `Update: test update ${employeeData.name} (${employeeData.email})`,
      { duration: 3000 }
    );
    
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <Edit className="w-4 h-4" />
        Edit Employee
      </Button>
    
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Edit Employee"
        size="xl"
      >
        <CreateEmployeeForm
          onSubmit={handleFormSubmit}
          isLoading={false}
          initialData={employee}
        />
      </Modal>
    </>
  );
}
