import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";

function MyAppointments() {
  const { doctors } = useContext(AppContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div>
      <motion.p
        className="pb-4 font-medium text-zinc-700 border-b"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        My appointments
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {doctors.slice(0, 3).map((item, index) => (
            <motion.div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={item._id}
              variants={itemVariants}
              transition={{ type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <img className="w-32 bg-indigo-50" src={item.image} alt="" />
              </motion.div>

              {/* Details */}
              <motion.div
                className="flex-1 text-sm text-zinc-600"
                variants={containerVariants}
              >
                <motion.p
                  className="text-neutral-800 font-semibold"
                  variants={itemVariants}
                >
                  {item.name}
                </motion.p>
                <motion.p variants={itemVariants}>{item.speciality}</motion.p>
                <motion.p
                  className="text-neutral-800 font-medium mt-1"
                  variants={itemVariants}
                >
                  Address :
                </motion.p>
                <motion.p className="text-xs" variants={itemVariants}>
                  {item.address.line1}
                </motion.p>
                <motion.p className="text-xs" variants={itemVariants}>
                  {item.address.line2}
                </motion.p>
                <motion.p className="text-sm mt-1" variants={itemVariants}>
                  <span className="text-xs text-neutral-700 font-medium">
                    Date & Time :{" "}
                  </span>
                  25 , July ,2025 | 8:30 PM
                </motion.p>
              </motion.div>
              <div>

              </div>
              {/* Buttons */}
              <motion.div
                className="flex flex-col gap-2 justify-end"
                variants={containerVariants}
              >
                <motion.button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Pay Online
                </motion.button>
                <motion.button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Cancel appointment
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default MyAppointments;
