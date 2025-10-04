'use client';

import { useState } from 'react';
import { Button, Modal } from '@/components/ui';
import { CreateEmployeeForm } from '@/components/forms/CreateEmployeeForm/index';
import { CreateEmployeeData } from '@/schemas/createEmployeeSchema';
import { Plus } from 'lucide-react';
import { toastHelpers } from '@/components/ui/Toast';
import { createEmployeeAction } from '@/app/actions/employess';
import { useRouter } from 'next/navigation';
import { clearDraftFromLocalStorage } from '@/utils';

export function AddEmployeeButton() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0); // Key to force form reset

  const handleCreateEmployee = async (data: CreateEmployeeData) => {
    setIsCreating(true);
    setError(null);
    
    try {
      const newEmployee = await createEmployeeAction(data);
      
      setIsModalOpen(false);
      setError(null);
      clearDraftFromLocalStorage();
      setFormKey(prev => prev + 1);
      
      // Success toast notification
      toastHelpers.success(
        `Employee ${newEmployee.name} created successfully!`,
        { duration: 4000 }
      );
      
      // Force page refresh to show new employee
      router.refresh();
      
    } catch (err) {
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
    <>
      <Button
        variant="primary"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add New Employee
      </Button>
    
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create New Employee"
        size="xl"
      >
        <CreateEmployeeForm
          key={formKey}
          onSubmit={handleCreateEmployee}
          isLoading={isCreating}
          error={error || undefined}
        />
      </Modal>
    </>
  );
}
