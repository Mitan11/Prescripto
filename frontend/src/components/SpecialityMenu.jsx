import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { specialityData } from "../assets/assets";
import { Link } from "react-router";

function SpecialityMenu() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {  once: true, margin: "-100px" });
  // const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={sectionRef}
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.h1
        className="text-3xl font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Find by Speciality
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="sm:w-1/2 text-center text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </motion.p>

      {/* Speciality List */}
      <motion.div
        className="flex sm:justify-center gap-8 pt-5 w-full overflow-scroll"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        
        {specialityData.map((item, index) => (
          
            <Link
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-5px] transition-all duration-300"
              to={`/doctors/${item.speciality}`}
              key={index}
              onClick={() => {
                scrollTo(0, 0);
              }}
            >
              <motion.img
                className="w-16 sm:w-24 mb-2"
                src={item.image}
                alt={item.speciality}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <p>{item.speciality}</p>
            </Link>
          
        ))}


      </motion.div>
    </motion.div>
  );
}

export default SpecialityMenu;
