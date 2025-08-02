'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster 
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1f2937',
          color: '#ffffff',
          border: '1px solid #374151',
        },
        success: {
          style: {
            background: '#1f2937',
            color: '#10b981',
            border: '1px solid #059669',
          },
        },
        error: {
          style: {
            background: '#1f2937',
            color: '#ef4444',
            border: '1px solid #dc2626',
          },
        },
      }}
    />
  );
}
