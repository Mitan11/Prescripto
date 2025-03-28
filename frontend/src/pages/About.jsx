import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import AboutImagesSection from "../components/AboutImagesSection";

function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "backOut" }
    },
    hover: { y: -10 }
  };

  return (
    <div>
      {/* About Us Heading */}
      <motion.div
        className="text-center mt-[100px] text-2xl text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </motion.div>

      {/* Main Content Section */}
      <motion.div
        className="my-10 flex flex-col md:flex-row gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        />

        <motion.div
          className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600"
          variants={containerVariants}
        >
          {[
            "A premier multispeciality hospital dedicated to providing exceptional healthcare services...",
            "We aspire to be a leading healthcare provider recognized for excellence...",
            <b key="vision" className="text-gray-800">Our Vision</b>,
            "We believe in giving back to the community..."
          ].map((content, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="leading-relaxed"
            >
              {content}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>

      {/* Why Choose Us Heading */}
      <motion.div
        className="text-xl my-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2 }}
      >
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        className="flex flex-col md:flex-row mb-20"
        variants={containerVariants}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.1 }}
      >
        {[
          { title: "Efficiency", content: "Advanced diagnostic imaging and laboratory services" },
          { title: "Convenience", content: "Specialized units for intensive care, neonatal care, and more" },
          { title: "Personalization", content: "Modern operating theaters and recovery rooms" }
        ].map((card, index) => (
          <motion.div
            key={index}
            className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <b>{card.title} : </b>
            <p>{card.content}</p>
          </motion.div>
        ))}
      </motion.div>
      <AboutImagesSection />
    </div>
  );
}

export default About;