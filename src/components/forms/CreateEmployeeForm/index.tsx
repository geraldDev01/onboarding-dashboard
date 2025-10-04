"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Slider } from '@/components/ui';
import { createEmployeeSchema, type CreateEmployeeData } from '@/schemas';
import { DEPARTMENTS, COUNTRIES } from '@/types/employee';
import { UserPlus, DollarSign } from 'lucide-react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useEffect, useCallback, useRef } from 'react';
import { saveDraftToLocalStorage, loadDraftFromLocalStorage } from '@/utils';
import 'react-datepicker/dist/react-datepicker.css';

interface CreateEmployeeFormProps {
  onSubmit: (data: CreateEmployeeData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

// Default form values (empty form)
const getDefaultValues = (): Partial<CreateEmployeeData> => ({
  name: '',
  email: '',
  department: 'Engineering',
  hireDate: '',
  salary: 3000,
  country: 'El Salvador',
});

export const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateEmployeeData>({
    mode: 'onChange',
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: getDefaultValues(),
  });

  const salaryValue = watch('salary') || 3000;
  const selectedDepartment = watch('department');
  const selectedCountry = watch('country');
  const hireDateValue = watch('hireDate');

  // Load draft from localStorage on component mount
  useEffect(() => {
    const draftData = loadDraftFromLocalStorage();
    if (draftData) {
      // Set each field value from draft
      Object.keys(draftData).forEach(key => {
        const typedKey = key as keyof CreateEmployeeData;
        if (draftData[typedKey] !== undefined) {
          setValue(typedKey, draftData[typedKey], { shouldValidate: false });
        }
      });
    }
  }, [setValue]);

  const formValues = watch();

  // Function to save current form state to localStorage
  const saveDraft = useCallback(() => {
    const hasAnyData = Object.values(formValues).some(value => 
      value !== '' && value !== null && value !== undefined
    );
    
    if (hasAnyData) {
      saveDraftToLocalStorage(formValues);
    }
  }, [formValues]);

  // Setup auto-save every 30 seconds
  useEffect(() => {
    // Clear existing interval
    if (saveIntervalRef.current) {
      clearInterval(saveIntervalRef.current);
    }

    // Set new interval to save draft every 30 seconds
    saveIntervalRef.current = setInterval(saveDraft, 30000);
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, [saveDraft]);

  useEffect(() => {
    const timeoutId = setTimeout(saveDraft, 1000); // Save after 1 second of no changes
    return () => clearTimeout(timeoutId);
  }, [formValues, saveDraft]);

  // Prepare options for select components
  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept,
  }));

  const countryOptions = COUNTRIES.map(country => ({
    value: country,
    label: country,
  }));

  // Date picker styles
  const datePickerClass = `w-full px-3 py-2 text-sm rounded-md border ${
    errors.hireDate ? 'border-red-500' : 'border-gray-300'
  } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

  // Handle form submission
  const handleFormSubmit = (data: CreateEmployeeData) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white p-8 w-full ">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-auto">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground dark:text-muted-foreground">
          Add a new team member to your organization
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Input
              label="Nombre completo"
              placeholder="John Doe"
              {...register('name')}
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Input
              label="Email corporativo"
              type="email"
              placeholder="john.doe@rebuhr.com"
              {...register('email')}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none dark:text-foreground">
              Departamento *
            </label>
            <Select
              options={departmentOptions}
              value={departmentOptions.find(option => option.value === selectedDepartment)}
              onChange={(option) => setValue('department', option?.value || 'Engineering', { shouldValidate: true })}
              placeholder="Selecciona el departamento"
              isSearchable={false}
            />
            {errors.department && (
              <p className="text-sm text-red-500">{errors.department.message}</p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none dark:text-foreground">
              País *
            </label>
            <Select
              options={countryOptions}
              value={countryOptions.find(option => option.value === selectedCountry)}
              onChange={(option) => setValue('country', option?.value || 'El Salvador', { shouldValidate: true })}
              placeholder="Selecciona el país"
              isSearchable={false}
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>
        </div>

        {/* Hire Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none dark:text-foreground">
            Fecha de ingreso *
          </label>
          <DatePicker
            selected={hireDateValue ? new Date(hireDateValue) : null}
            onChange={(date) => {
              setValue('hireDate', date ? date.toISOString().split('T')[0] : '', { shouldValidate: true });
            }}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Selecciona la fecha de ingreso"
            className={datePickerClass}
          />
          {errors.hireDate && (
            <p className="text-sm text-red-500">{errors.hireDate.message}</p>
          )}
        </div>

        {/* Salary */}
        <div className="space-y-4">
          <Slider
            label="Salario mensual"
            value={salaryValue}
            min={800}
            max={10000}
            step={100}
            onChange={(value) => setValue('salary', value, { shouldValidate: true })}
            error={!!errors.salary}
            errorMessage={errors.salary?.message}
            marks={[
              { value: 800, label: '$800' },
              { value: 4000, label: '$4,000' },
              { value: 8000, label: '$8,000' },
              { value: 10000, label: '$10,000' },
            ]}
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>Actual: ${salaryValue.toLocaleString()}</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={!isValid || isLoading}
            className="w-full h-11 text-base font-medium"
          >
            {isLoading ? 'Creating employee...' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </div>
  );
};
