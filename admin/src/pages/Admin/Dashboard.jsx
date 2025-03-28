import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import { motion } from "framer-motion";


function Dashboard() {
  const { dashData, getDashData, cancelAppointment, aToken } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData ? (
    <div className="p-5 max-h-[90vh] overflow-y-scroll w-full">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold ">{dashData.doctors}</p>
            <p className="text-sm text-gray-500">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold ">{dashData.appointments}</p>
            <p className="text-sm text-gray-500">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold ">{dashData.patients}</p>
            <p className="text-sm text-gray-500">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300">
          <img src={assets.list_icon} alt="" />
          <p className="text-xl font-semibold">Latest Appointments</p>
        </div>
        <div className="pt-4 border border-t-0 w-full border-gray-300">
          {dashData?.latestAppointments?.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition-all duration-300 border-b border-gray-300"
            >
              <img
                className="w-8 rounded-full"
                src={item.docData.image}
                alt=""
              />
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-800">{item.docData.name}</p>
                <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium cursor-not-allowed">
                  Cancelled
                </p>
              ) : item.payment || item.isCompleted ? (
                <span className="text-green-400 text-xs font-medium cursor-not-allowed">
                  Completed
                </span>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="rounded-full text-white px-4 w-8 h-8 bg-red-100 hover:bg-red-200 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <span>
                    <FaXmark className="text-red-400" />
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <DashboardSkeleton />
    </div>
  );
}

export default Dashboard;
