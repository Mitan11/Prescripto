import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import SkeletonTableRow from "../../components/SkeletonTableRow";

function DoctorAppointment() {
  const {
    dToken,
    appointments,
    getAppointments,
    completedAppointment,
    cancelledAppointment,
  } = useContext(DoctorContext);
  const [isLoading, setIsLoading] = useState(true);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      setIsLoading(true);
      getAppointments().finally(() => setIsLoading(false));
    }
  }, [dToken]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full m-5"
    >
      <div className="w-full">
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="mb-3 text-lg font-medium"
        >
          All Appointments
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border rounded text-sm max-h-[76vh] min-h-[50vh] overflow-y-scroll border-gray-300 w-full"
        >
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-300 w-full place-items-center">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SkeletonTableRow />
              </motion.div>
            ))
          ) : (
            appointments.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid cursor-pointer grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 hover:bg-gray-200 transition-all duration-300 border-b border-gray-300 w-full place-items-center"
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <motion.img
                    src={item.userData.image}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    whileHover={{ scale: 1.1 }}
                  />
                  <p>{item.userData.name}</p>
                </div>
                <div className="text-xs inline border border-primary rounded-full px-2">
                  <p>{item.payment ? "Online" : "Cash"}</p>
                </div>
                <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                <p>{slotDateFormat(item.slotDate) + " | " + item.slotTime}</p>
                <p>{currency + item.docData.fees}</p>

                {item.cancelled ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs"
                  >
                    Cancelled
                  </motion.p>
                ) : item.isCompleted ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-xs"
                  >
                    Completed
                  </motion.p>
                ) : (
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => completedAppointment(item._id)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full text-white w-8 h-8 bg-green-100 hover:bg-green-200 transition-all duration-300 flex items-center justify-center shadow-sm"
                    >
                      <FaCheck className="text-green-400" />
                    </motion.button>
                    {!item.payment ? <motion.button
                      onClick={() => cancelledAppointment(item._id)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full text-white w-8 h-8 bg-red-100 hover:bg-red-200 transition-all duration-300 flex items-center justify-center shadow-sm"
                    >
                      <FaXmark className="text-red-400" />
                    </motion.button> : ""}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DoctorAppointment;
