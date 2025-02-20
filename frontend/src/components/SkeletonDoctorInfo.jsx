import React from "react";

const SkeletonDoctorInfo = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="bg-gray-300 w-full sm:max-w-72 h-50 rounded-lg"></div>
      <div className="flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
        {/* Doctor name */}
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
        {/* About */}
        <div className="mt-3">
          <div className="h-5 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-56 bg-gray-300 rounded mt-2"></div>
          <div className="h-4 w-64 bg-gray-300 rounded mt-1"></div>
        </div>
        <div className="h-5 w-40 bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );
};

export default SkeletonDoctorInfo;
