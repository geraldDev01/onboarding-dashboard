"use client";
import React from 'react';
import { toast, ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

// Custom toast configurations for different types
const toastConfig = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    className: 'bg-green-50 border border-green-200 text-green-800',
    progressClassName: 'bg-green-600',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    className: 'bg-red-50 border border-red-200 text-red-800',
    progressClassName: 'bg-red-600',
  },
  warning: {
    icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    className: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    progressClassName: 'bg-yellow-600',
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-600" />,
    className: 'bg-blue-50 border border-blue-200 text-blue-800',
    progressClassName: 'bg-blue-600',
  },
};

export interface ToastOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  position?: ToastContainerProps['position'];
}

export const toastHelpers = {
  success: (message: string, options?: Partial<ToastOptions>) => {
    const config = toastConfig.success;
    toast.success(message, {
      icon: config.icon,
      className: config.className,
      progressClassName: config.progressClassName,
      autoClose: options?.duration || 5000,
      position: options?.position || 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  
  error: (message: string, options?: Partial<ToastOptions>) => {
    const config = toastConfig.error;
    toast.error(message, {
      icon: config.icon,
      className: config.className,
      progressClassName: config.progressClassName,
      autoClose: options?.duration || 6000,
      position: options?.position || 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  
  warning: (message: string, options?: Partial<ToastOptions>) => {
    const config = toastConfig.warning;
    toast.warning(message, {
      icon: config.icon,
      className: config.className,
      progressClassName: config.progressClassName,
      autoClose: options?.duration || 5000,
      position: options?.position || 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
  
  info: (message: string, options?: Partial<ToastOptions>) => {
    const config = toastConfig.info;
    toast.info(message, {
      icon: config.icon,
      className: config.className,
      progressClassName: config.progressClassName,
      autoClose: options?.duration || 4000,
      position: options?.position || 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

// Toast Container component for wrapping the app
export const ToastContainerWrapper: React.FC<Partial<ToastContainerProps>> = ({
  position = 'top-right',
  autoClose = 5000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  className = 'toast-wrapper',
  ...props
}) => (
  <ToastContainer
    position={position}
    autoClose={autoClose}
    hideProgressBar={hideProgressBar}
    newestOnTop={newestOnTop}
    closeOnClick={closeOnClick}
    rtl={rtl}
    pauseOnFocusLoss={pauseOnFocusLoss}
    draggable={draggable}
    pauseOnHover={pauseOnHover}
    className={className}
    toastClassName="toast-item"
    {...props}
  />
);

// Main Toast component
export const Toast: React.FC = () => {
  return <ToastContainerWrapper />;
};
