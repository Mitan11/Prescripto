import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import TableRowSkeleton from "../../components/TableRowSkeleton";

function AllAppointments() {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (aToken) {
      setIsLoading(true);
      getAllAppointments().finally(() => setIsLoading(false));
    }
  }, [aToken]);

  return (
    <motion.div
      className="w-full max-w-6xl m-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border border-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="place-items-center hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300 sticky top-0 bg-white">
          <p>#</p>
          <p>Patient Name</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          Array(5)
            .fill()
            .map((_, index) => <TableRowSkeleton key={index} />)
        ) : appointments.length > 0 ? (
          appointments.map((item, index) => (
            <motion.div
              key={item._id}
              className="place-items-center flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p className="max-sm:hidden">
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={item.docData.image}
                  alt=""
                  className="bg-gray-200 w-8 h-8 rounded-full"
                />
                <p>{item.docData.name}</p>
              </div>
              <p className="max-sm:hidden">
                {currency}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium cursor-not-allowed">
                  Cancelled
                </p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="rounded-full text-white px-4 w-8 h-8 bg-red-100 hover:bg-red-200 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <FaXmark className="text-red-400" />
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <div className="flex justify-center items-center h-40 text-gray-500">
            No Appointments Found
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AllAppointments;
