import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="p-5 max-h-[90vh] overflow-y-scroll w-full">
      <div className="flex flex-wrap gap-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex items-center gap-2 bg-white p-4 min-w-52 rounded border border-gray-300"
          >
            <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-5 w-16 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white mt-10">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border border-gray-300">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-40 bg-gray-300 rounded"></div>
        </div>
        <div className="pt-4 border border-t-0 w-full border-gray-300">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex items-center gap-3 px-6 py-3 border-b border-gray-300"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
