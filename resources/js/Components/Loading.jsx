import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/60 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
