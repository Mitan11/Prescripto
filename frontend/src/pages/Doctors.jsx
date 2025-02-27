import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";

function Doctors() {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterdoc, setFilterdoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const applyFilter = () => {
    if (speciality) {
      setFilterdoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterdoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

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

  const filterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)" },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.p 
        className="text-gray-600"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Browse through the doctors specialist.
      </motion.p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <motion.button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Filters
        </motion.button>

        <motion.div
          className={`flex-col gap-4 text-gray-600 text-sm ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((specialty) => (
            <motion.p
              key={specialty}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === specialty ? "bg-indigo-100 text-black" : ""
              }`}
              onClick={() => {
                speciality === specialty
                  ? navigate("/doctors")
                  : navigate(`/doctors/${specialty}`);
              }}
              variants={filterVariants}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              
            >
              {specialty}
            </motion.p>
          ))}
        </motion.div>

        <motion.div 
          className="w-full grid grid-cols-auto gap-4 gap-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filterdoc.length > 0 ? (
            <AnimatePresence>
              {filterdoc.map((item, index) => (
                <motion.div
                  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white"
                  key={item._id}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
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
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-center text-green-500">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <p>Available</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">
                      {item.name}
                    </p>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            Array(6)
              .fill()
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Doctors;
