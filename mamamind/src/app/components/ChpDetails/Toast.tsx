'use client';

import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? '✓' : '✗';

  return (
    <div className={`fixed top-5 right-5 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center`}>
      <span className="mr-2 text-xl">{icon}</span>
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 focus:outline-none">
        ✕
      </button>
    </div>
  );
};