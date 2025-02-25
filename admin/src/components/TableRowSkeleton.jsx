import React from "react";
import { motion } from "framer-motion";

function TableRowSkeleton() {
  return (
    <motion.div
      className="place-items-center flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 animate-pulse"
    >
      <div className="h-4 w-6 bg-gray-200 rounded" />
      <div className="h-6 w-24 bg-gray-200 rounded" />
      <div className="h-4 w-10 bg-gray-200 rounded" />
      <div className="h-4 w-28 bg-gray-200 rounded" />
      <div className="h-6 w-24 bg-gray-200 rounded" />
      <div className="h-4 w-12 bg-gray-200 rounded" />
      <div className="h-8 w-8 bg-gray-200 rounded-full" />
    </motion.div>
  );
}

export default TableRowSkeleton;
