import React from 'react';
import { toast, Toaster as SonnerToaster, ToastBar } from 'sonner';
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from 'react-icons/fa';

// 自定义Toast hook，用于展示通知
export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      icon: <FaCheck className="text-success" />,
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      icon: <FaExclamationTriangle className="text-error" />,
    });
  };

  const showWarning = (message: string) => {
    toast.warning(message, {
      icon: <FaExclamationTriangle className="text-warning" />,
    });
  };

  const showInfo = (message: string) => {
    toast.info(message, {
      icon: <FaInfo className="text-primary-400" />,
    });
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    dismiss,
  };
};

// Toast组件
export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: 'bg-dark-300 border border-dark-200 text-white',
        style: {
          background: '#0c101a', // dark-300
          color: 'white',
          borderRadius: '0.375rem',
          border: '1px solid rgba(30, 41, 59, 0.5)',
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message, dismiss }) => (
            <>
              {icon}
              {message}
              <button onClick={dismiss} className="ml-2">
                <FaTimes className="text-gray-400 hover:text-white" />
              </button>
            </>
          )}
        </ToastBar>
      )}
    </SonnerToaster>
  );
}; 