"use client";
import React, { useState, useEffect, useId } from 'react';
import clsx from 'clsx';

interface ToggleProps {
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
  size?: 'sm' | 'md' | 'lg';
  ref?: React.Ref<HTMLInputElement>;
}

export const Toggle: React.FC<ToggleProps> = ({
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
  size = 'md',
  ref,
}) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange?.(event);
  };

  const toggleId = useId();

  const sizeClasses = {
    sm: {
      container: 'h-4 w-7',
      thumb: 'h-3 w-3',
      translate: 'translate-x-3',
    },
    md: {
      container: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
    },
    lg: {
      container: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={clsx("w-full space-y-2", className)}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            name={name}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className="sr-only"
          />
          <div
            className={clsx(
              'relative inline-flex rounded-full transition-colors cursor-pointer',
              currentSize.container,
              {
                'bg-destructive': error && isChecked,
                'bg-primary': !error && isChecked,
                'bg-input hover:bg-input/80': !isChecked,
                'opacity-50 cursor-not-allowed': disabled,
                'dark:bg-border': !isChecked,
              }
            )}
            onClick={() => {
              if (!disabled && ref && 'current' in ref && ref.current) {
                ref.current.click();
              }
            }}
          >
            <div
              className={clsx(
                'absolute top-0.5 left-0.5 rounded-full bg-white transition-transform',
                currentSize.thumb,
                {
                  [currentSize.translate]: isChecked,
                }
              )}
            />
          </div>
        </div>
        
        {label && (
          <label 
            htmlFor={toggleId}
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
        <p className="text-sm text-destructive dark:text-destructive ml-12">
          {errorMessage}
        </p>
      )}
      
      {!error && helperText && (
        <p className="text-sm text-muted-foreground dark:text-muted-foreground ml-12">
          {helperText}
        </p>
      )}
    </div>
  );
};
