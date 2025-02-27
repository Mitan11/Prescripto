import React from 'react'

function MyAppointmentskeleton() {
    return (
        <div
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="w-32 h-32 bg-gray-200 rounded"></div>
    
          {/* Details Placeholder */}
          <div className="flex-1 text-sm text-zinc-600 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5"></div>
          </div>
    
          <div></div>

          {/* Buttons Placeholder */}
          <div className="flex flex-col gap-2 justify-end items-end w-full">
            <div className="h-10 bg-gray-200 rounded w-48"></div>
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      );
}

export default MyAppointmentskeleton