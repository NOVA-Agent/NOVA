import React, { useState, useCallback } from 'react';
import { toast, Toaster as SonnerToaster, ToastBar } from 'sonner';
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '../../lib/utils';

// Custom Toast hook for displaying notifications
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = uuidv4();
    setToasts(prev => [...prev, { ...toast, id }]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
  };
};

// Toast component
export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={cn(
              'px-4 py-3 rounded-lg shadow-lg text-white',
              {
                'bg-green-500': toast.type === 'success',
                'bg-red-500': toast.type === 'error',
                'bg-yellow-500': toast.type === 'warning',
                'bg-blue-500': toast.type === 'info',
              }
            )}
          >
            <div className="flex items-center space-x-2">
              {toast.title && (
                <span className="font-medium">{toast.title}</span>
              )}
              {toast.message && (
                <span>{toast.message}</span>
              )}
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 hover:opacity-80"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 