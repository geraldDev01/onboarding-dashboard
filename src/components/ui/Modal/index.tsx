"use client";
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black/50 backdrop-blur-sm',
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={clsx(
          'bg-white rounded-lg shadow-xl',
          'w-full relative',
          sizes[size],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 ">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold text-gray-900 "
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        )}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
