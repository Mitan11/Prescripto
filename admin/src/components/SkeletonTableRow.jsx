import React from "react";

function SkeletonTableRow() {
  return (
    <div className="animate-pulse flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-300 w-full place-items-center">
      <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      <div className="h-6 w-20 bg-gray-300 rounded"></div>
      <div className="h-6 w-12 bg-gray-300 rounded"></div>
      <div className="h-6 w-8 bg-gray-300 rounded"></div>
      <div className="h-6 w-28 bg-gray-300 rounded"></div>
      <div className="h-6 w-10 bg-gray-300 rounded"></div>
      <div className="h-6 w-16 bg-gray-300 rounded"></div>
    </div>
  );
}

export default SkeletonTableRow;
