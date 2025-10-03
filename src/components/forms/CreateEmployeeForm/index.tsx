"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Slider } from '@/components/ui';
import { createEmployeeSchema, type CreateEmployeeData } from '@/schemas';
import { DEPARTMENTS, COUNTRIES } from '@/types/employee';
import { UserPlus, DollarSign } from 'lucide-react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

interface CreateEmployeeFormProps {
  onSubmit: (data: CreateEmployeeData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateEmployeeData>({
    mode: 'onChange',
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      name: '',
      email: '',
      department: 'Engineering',
      hireDate: new Date().toISOString().split('T')[0],
      salary: 3000,
      country: 'El Salvador',
    },
  });

  const salaryValue = watch('salary') || 3000;
  const selectedDepartment = watch('department');
  const selectedCountry = watch('country');
  const hireDateValue = watch('hireDate');

  // Prepare options for select components
  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept,
  }));

  const countryOptions = COUNTRIES.map(country => ({
    value: country,
    label: country,
  }));

  // Date picker styles - using CSS classes instead of inline styles
  const datePickerClass = `w-full px-3 py-2 text-sm rounded-md border ${
    errors.hireDate ? 'border-red-500' : 'border-gray-300'
  } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

  return (
    <div className="bg-white p-8 w-full ">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-auto">
          <UserPlus className="w-8 h-8 text-primary-foreground" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground dark:text-muted-foreground">
          Add a new team member to your organization
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Input
              label="Nombre completo"
              placeholder="John Doe"
              {...register('name')}
              error={!!errors.name}
              errorMessage={errors.name?.message}
              helperText="Mínimo 3 caracteres"
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
              helperText="Debe usar el dominio @rebuhr.com"
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
            {!errors.department && (
              <p className="text-sm text-gray-500">Selecciona el departamento del empleado</p>
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
            {!errors.country && (
              <p className="text-sm text-gray-500">Selecciona el país del empleado</p>
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
          {!errors.hireDate && (
            <p className="text-sm text-gray-500">No puede ser anterior a hoy</p>
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
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
            <p className="text-sm text-destructive text-center">
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
