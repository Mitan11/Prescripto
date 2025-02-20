import React from "react";
import { motion } from "framer-motion";

const SkeletonBookingSlots = () => {
  const dummySlots = new Array(7).fill(null); // Creating 7 placeholders

  return (
    <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
      {dummySlots.map((_, index) => (
        <motion.div
          key={index}
          className="text-center py-6 min-w-16 rounded-full border border-gray-200 bg-gray-300 animate-pulse"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <p className="text-gray-400">--</p>
          <p className="text-gray-400">--</p>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonBookingSlots;
