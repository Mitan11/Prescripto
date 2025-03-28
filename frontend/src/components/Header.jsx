import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
];

function Header() {
  const { doctors } = useContext(AppContext);

  // Get the first available doctor for showcase
  const featuredDoctor = doctors && doctors.length > 0 ? doctors[0] : null;

  return (
    <motion.div
      className="relative mt-16 overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-xl px-6 md:px-10 lg:px-16 py-8 md:py-12"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
      />

      <div className="flex flex-col lg:flex-row items-center relative z-10">
        {/* Left Side */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-4 md:gap-6 py-6 md:py-8 lg:py-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-2">
            <motion.span
              className="text-sm text-white/90 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              #1 Healthcare Platform
            </motion.span>
          </div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Book Appointment <br />
            <span className="text-white/80">With Trusted Doctors</span>
          </motion.h1>

          <motion.p
            className="text-white/80 text-base md:text-lg max-w-md my-2 md:my-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-5 lg:gap-8 w-full md:w-auto mb-4 md:mb-6">
            <motion.div
              className="flex flex-row items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <AnimatedTooltip items={people} />
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            >
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-full">
                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white/70 text-sm">Verified Specialists</span>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.a
              className="flex items-center justify-center gap-2 bg-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-primary font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              href="#speciality"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Appointment
              <motion.svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
              </motion.svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="w-full lg:w-1/2 relative mt-4 md:mt-6 lg:mt-0 max-w-xl mx-auto lg:max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="relative flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-6 lg:p-8 overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-0 opacity-70" />

            {/* Card content */}
            <div className="w-full z-10 flex flex-col gap-3 md:gap-4">
              {/* Appointment scheduling card */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 sm:p-4 md:p-5 flex flex-col gap-3 md:gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-primary text-base md:text-lg font-semibold">Quick Appointment</h3>
                  {featuredDoctor?.available && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">Available Now</span>
                  )}
                </div>

                {/* Doctor selection */}
                {featuredDoctor ? (
                  <Link to={`/appointment/${featuredDoctor.id}`} className="block hover:bg-gray-100 transition-colors duration-200 rounded-xl">
                    <div className="flex items-center gap-2 md:gap-3 bg-gray-50 p-2 md:p-3 rounded-xl mt-1 group">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                        <img
                          src={featuredDoctor.image || "https://via.placeholder.com/100"}
                          alt={featuredDoctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-semibold text-sm md:text-base truncate">{featuredDoctor.name}</p>
                        <div className="flex items-center">
                          <span className="text-gray-500 text-xs truncate">{featuredDoctor.speciality}</span>
                          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-300"></span>
                          <span className="text-gray-500 text-xs">{featuredDoctor.experience}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${i < Math.round(featuredDoctor.averageRating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            {featuredDoctor.averageRating > 0
                              ? `${featuredDoctor.averageRating} (${featuredDoctor.ratingCount})`
                              : "New"}
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary text-white p-1.5 rounded-lg flex-shrink-0 group-hover:bg-primary/90 transition-colors duration-200">
                        <svg className="w-3 h-3 md:w-4 md:h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl text-center text-gray-500 italic">
                    No doctors available at the moment
                  </div>
                )}

                {/* Doctor brief info */}
                {featuredDoctor?.about && (
                  <div className="mt-1 p-2 bg-gray-50/50 rounded-xl">
                    <p className="text-xs text-gray-600 line-clamp-2">{featuredDoctor.about}</p>
                  </div>
                )}

                {/* Doctor details */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Fee</p>
                    <p className="text-sm font-medium text-gray-900">${featuredDoctor?.fees || '--'}</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">Qualification</p>
                    <p className="text-sm font-medium text-gray-900">{featuredDoctor?.degree || '--'}</p>
                  </div>
                </div>

              </motion.div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 gap-2 md:gap-3">

                <motion.div
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 md:p-4 flex items-center gap-2 md:gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="bg-blue-100 p-2 md:p-2.5 rounded-xl flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs truncate">Success Rate</p>
                    <p className="text-gray-800 font-semibold text-sm md:text-base truncate">98%</p>
                  </div>
                </motion.div>
              </div>

              {/* Doctors card */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 md:p-4 flex items-center justify-between"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-purple-100 p-2 md:p-2.5 rounded-xl flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs truncate">Available Doctors</p>
                    <p className="text-gray-800 font-semibold text-sm md:text-base truncate">{doctors.length}+ Specialists</p>
                  </div>
                </div>
                <Link to="/doctors" className="text-primary text-xs md:text-sm font-medium hover:underline flex-shrink-0">View All</Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Header;
