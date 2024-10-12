'use client';

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  autoClose = true,
  autoCloseDuration = 3000,
}) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? '✓' : '✗';

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer); 
    }
  }, [autoClose, autoCloseDuration, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 max-w-sm w-full sm:max-w-xs ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center`}
      role="alert"
      aria-live="assertive"
    >
      <span className="mr-2 text-xl">{icon}</span>
      <p className="flex-grow">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};
