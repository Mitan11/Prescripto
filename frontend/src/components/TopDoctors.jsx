import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";
import SkeletonCard from "./SkeletonCard";

function TopDoctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10"
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.2 }} // Trigger animation once when 20% of the component is in view
      variants={containerVariants}
    >
      <motion.h1 className="text-3xl font-medium" variants={itemVariants}>
        Top Doctors to Book
      </motion.h1>
      <motion.p
        className="sm:w-1/3 text-center text-sm"
        variants={itemVariants}
      >
        Simply browse through our extensive list of trusted doctors.
      </motion.p>

      <motion.div
        className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0"
        variants={containerVariants}
      >
        {doctors.length > 0 ? doctors.slice(0, 10).map((item, index) => (
          <motion.div
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white"
            key={index}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
          >
            <img
              className="bg-blue-50 w-full"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </motion.div>
        )) :Array(3)
        .fill()
        .map((_, i) => <SkeletonCard key={i} />)}
      </motion.div>

      <motion.button
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-all duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
      >
        More
      </motion.button>
    </motion.div>
  );
}

export default TopDoctors;