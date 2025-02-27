import React from "react";
import { motion } from "framer-motion";

const SkeletonTimeSlots = () => {
  const dummyTimeSlots = new Array(6).fill(null); // Creating 5 placeholders

  return (
    <div className="flex items-center sm:ml-72 sm:pl-4 gap-3 w-full overflow-x-scroll mt-4">
      {dummyTimeSlots.map((_, index) => (
        <motion.p
          key={index}
          className="text-sm font-light flex-shrink-0 px-5 py-2 rounded-full bg-gray-300 border border-gray-200 animate-pulse"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          -- : --
        </motion.p>
      ))}
    </div>
  );
};

export default SkeletonTimeSlots;
