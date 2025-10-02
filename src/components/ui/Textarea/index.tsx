"use client";
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  className?: string;
  name?: string;
  rows?: number;
  maxLength?: number;
  autoResize?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  label,
  helperText,
  className = '',
  name,
  rows = 3,
  maxLength,
  autoResize = false,
  ref,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange?.(event);
  };

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  const baseClasses = 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none';

  const textareaClasses = clsx(
    baseClasses,
    {
      'border-destructive focus-visible:ring-destructive': error,
      'border-primary focus-visible:ring-primary': !error && isFocused,
      'dark:border-border dark:bg-background dark:text-foreground': true,
      'resize-y': !autoResize,
    },
    className
  );

  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-foreground"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={(node) => {
          if (ref && 'current' in ref) {
            ref.current = node;
          }
          textareaRef.current = node;
        }}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
      />

      {maxLength && value && (
        <div className="text-right text-xs text-muted-foreground dark:text-muted-foreground">
          {value.length}/{maxLength}
        </div>
      )}

      {error && errorMessage && (
        <p className="text-sm text-destructive dark:text-destructive">
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
