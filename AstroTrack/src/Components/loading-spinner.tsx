import React from 'react';

export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-pink-500 border-r-transparent border-b-teal-500 border-l-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border-4 border-t-yellow-500 border-r-transparent border-b-red-500 border-l-transparent rounded-full animate-spin-slower"></div>
        </div>
      </div>
    );
  }
  