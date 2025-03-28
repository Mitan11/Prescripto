import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <div className="border border-indigo-200 rounded-xl min-w-56 overflow-hidden cursor-pointer animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-indigo-50 h-32 w-full skeleton"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 skeleton "></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-3 skeleton "></div>
        <div className="flex items-center gap-1 text-sm mt-2">
          <div className="h-4 w-4 bg-gray-300 rounded skeleton "></div>
          <div className="h-3 bg-gray-300 rounded w-1/4 skeleton "></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
