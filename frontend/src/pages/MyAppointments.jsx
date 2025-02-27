import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import NoAppointments from "../components/NoAppointments";
import MyAppointmentskeleton from "../components/MyAppointmentskeleton";

function MyAppointments() {
  const { token, backendUrl, getDoctorsData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancelAppointment`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const makePayment = async (appointmentId) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/makePayment`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

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
          {isLoading ? (
            // Show skeleton loaders while loading
            Array(6)
              .fill()
              .map((_, i) => (
                <motion.div key={i}>
                  <MyAppointmentskeleton />
                </motion.div>
              ))
          ) : appointments && appointments.length === 0 ? (
            // Show no appointments component when loading is done and array is empty
            <motion.div>
              <NoAppointments />
            </motion.div>
          ) : (
            // Show appointments list when data exists
            appointments.map((item, index) => (
              <motion.div
                className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ${
                  item.cancelled ? "opacity-50 cursor-not-allowed" : ""
                } ${isLoading ? "cursor-not-allowed" : ""}`}
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
                  <img
                    className="w-32 bg-indigo-50 sm:h-32 object-cover object-top"
                    src={item.docData.image}
                    alt=""
                  />
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
                    {item.docData.name}
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    {item.docData.speciality}
                  </motion.p>
                  <motion.p
                    className="text-neutral-800 font-medium mt-1"
                    variants={itemVariants}
                  >
                    Address :
                  </motion.p>
                  <motion.p className="text-xs" variants={itemVariants}>
                    {item.docData.address.line1}
                  </motion.p>
                  <motion.p className="text-xs" variants={itemVariants}>
                    {item.docData.address.line2}
                  </motion.p>
                  <motion.p className="text-sm mt-1" variants={itemVariants}>
                    <span className="text-xs text-neutral-700 font-medium">
                      Date & Time :{" "}
                    </span>
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </motion.p>
                </motion.div>
                <div></div>
                {/* Buttons */}
                <motion.div
                  className="flex flex-col gap-2 justify-end"
                  variants={containerVariants}
                >
                  {!item.cancelled && item.payment && (
                    <button className="sm:min-w-48 py-2 border cursor-not-allowed bg-indigo-50 border-green-500 rounded text-green-500 ">
                      Paid
                    </button>
                  )}
                  {!item.cancelled && !item.payment && (
                    <motion.button
                      className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      disabled={isLoading}
                      onClick={() => makePayment(item._id)}
                    >
                      Pay Online
                    </motion.button>
                  )}
                  {!item.cancelled && !item.payment && (
                    <motion.button
                      className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => cancelAppointment(item._id)}
                      disabled={isLoading}
                    >
                      Cancel appointment
                    </motion.button>
                  )}
                  {item.cancelled && (
                    <motion.button className="sm:min-w-48 py-2 border cursor-not-allowed border-red-500 rounded text-red-500 ">
                      Appointment cancelled
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default MyAppointments;
