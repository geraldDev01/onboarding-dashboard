"use client";
import React, { useState, useEffect, useId } from 'react';
import clsx from 'clsx';

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  className?: string;
  name?: string;
  marks?: Array<{ value: number; label: string }>;
  showValue?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeCommitted,
  disabled = false,
  error = false,
  errorMessage,
  label,
  helperText,
  className = '',
  name,
  marks = [],
  showValue = true,
  ref,
}) => {
  const [currentValue, setCurrentValue] = useState(value ?? defaultValue);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onChangeCommitted?.(currentValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const sliderId = useId();

  return (
    <div className={clsx('w-full space-y-2', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label 
            htmlFor={sliderId}
            className={clsx(
              'text-sm font-medium leading-none',
              {
                'text-destructive': error,
                'text-foreground dark:text-foreground': !error,
                'opacity-50': disabled,
              }
            )}
          >
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-muted-foreground dark:text-muted-foreground">
              {currentValue}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <div className="relative h-2 w-full rounded-full bg-input dark:bg-border">
          <div
            className={clsx(
              'absolute h-2 rounded-full transition-colors',
              {
                'bg-destructive': error,
                'bg-primary': !error,
              }
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <input
          ref={ref}
          type="range"
          id={sliderId}
          name={name}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          disabled={disabled}
          className={clsx(
            'absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer',
            {
              'cursor-not-allowed': disabled,
            }
          )}
        />
        
        <div
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all',
            {
              'bg-destructive border-destructive': error,
              'bg-primary border-primary': !error,
              'bg-white border-white shadow-md': true,
              'scale-110': isDragging,
            }
          )}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>

      {marks.length > 0 && (
        <div className="flex justify-between text-xs text-muted-foreground dark:text-muted-foreground">
          {marks.map((mark, index) => (
            <span key={index} className="text-center">
              {mark.label}
            </span>
          ))}
        </div>
      )}

      {error && errorMessage && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
      
      {!error && helperText && (
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
};
