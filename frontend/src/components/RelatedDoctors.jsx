import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import SkeletonCard from "./SkeletonCard";
import { motion, AnimatePresence } from "framer-motion";

function RelatedDoctors({ speciality, docId }) {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDocs] = useState([]);
  const navigate = useNavigate();

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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)" },
    tap: { scale: 0.98 },
  };

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl font-medium"
        variants={itemVariants}
      >
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
        <AnimatePresence>
          {relDoc.length > 0 ? (
            relDoc.slice(0, 5).map((item, index) => (
              <motion.div
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white"
                key={item._id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
              >
                <motion.img
                  className="bg-blue-50 w-full h-[230px] object-cover"
                  src={item.image}
                  alt=""
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
                <div className="p-4">
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-red-500"}`}>
                    <motion.div
                      className={`w-2 h-2 bg-green-500 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </motion.div>
            ))
          ) : (
            Array(4)
              .fill()
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
          )}
        </AnimatePresence>
      </motion.div>

      <motion.button
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-all duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileInView="visible"
        viewport={{ once: true }}
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

export default RelatedDoctors;