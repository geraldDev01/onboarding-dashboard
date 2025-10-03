"use client";
import React, { useState, useEffect, useRef, useId } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  className?: string;
  name?: string;
  indeterminate?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  label,
  helperText,
  className = '',
  name,
  ref,
}) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange?.(event);
  };

  const checkboxId = useId();

  return (
    <div className={clsx("w-full space-y-2", className)}>
      <div className="flex items-start space-x-3">
        <div className="relative">
          <input
            ref={(node) => {
              if (ref && 'current' in ref) {
                ref.current = node;
              }
              checkboxRef.current = node;
            }}
            type="checkbox"
            id={checkboxId}
            name={name}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className="sr-only"
          />
          <div
            className={clsx(
              'flex h-4 w-4 items-center justify-center rounded border-2 transition-colors cursor-pointer',
              {
                'border-destructive bg-destructive text-destructive-foreground': error,
                'border-primary bg-primary text-primary-foreground': !error && isChecked,
                'border-input bg-background hover:border-primary': !error && !isChecked,
                'opacity-50 cursor-not-allowed': disabled,
                'dark:border-border dark:bg-background': true,
              }
            )}
            onClick={() => {
              if (!disabled && checkboxRef.current) {
                checkboxRef.current.click();
              }
            }}
          >
            {(isChecked) && (
              <Check className="h-3 w-3" />
            )}
          </div>
        </div>
        
        {label && (
          <label 
            htmlFor={checkboxId}
            className={clsx(
              'text-sm font-medium leading-none cursor-pointer',
              {
                'text-destructive': error,
                'text-foreground dark:text-foreground': !error,
                'opacity-50 cursor-not-allowed': disabled,
              }
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
      </div>

      {error && errorMessage && (
        <p className="text-sm text-destructive dark:text-destructive ml-7">
          {errorMessage}
        </p>
      )}
      
      {!error && helperText && (
        <p className="text-sm text-muted-foreground dark:text-muted-foreground ml-7">
          {helperText}
        </p>
      )}
    </div>
  );
};
