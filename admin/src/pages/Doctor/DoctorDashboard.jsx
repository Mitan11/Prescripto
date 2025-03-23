import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import DashboardSkeleton from '../../components/DashboardSkeleton'
import { AppContext } from '../../context/AppContext'
import { FaXmark, FaCheck, FaStar } from 'react-icons/fa6'
import { motion } from 'framer-motion'

function DoctorDashboard() {

  const { dashData, getDashData, setDashData, dToken, completedAppointment, cancelledAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData ? (
    <div className="p-5 max-h-[90vh] overflow-y-scroll w-full">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold ">{currency}{dashData.earnings}</p>
            <p className="text-sm text-gray-500">Earnings</p>
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

        {/* Rating */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <div>
            <div className='flex items-center gap-1'>
              <FaStar className='text-yellow-300' />
              <p className="text-xl font-semibold ">{dashData.rating}</p>
            </div>
            <p className="text-sm text-gray-500">Rating</p>
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
                src={item.userData.image}
                alt=""
              />
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-800">{item.userData.name}</p>
                <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled || item.isCompleted ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs"
                >
                  Cancelled
                </motion.p>
              ) : item.isCompleted || item.payment ? (
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
                  <motion.button
                    onClick={() => cancelledAppointment(item._id)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full text-white w-8 h-8 bg-red-100 hover:bg-red-200 transition-all duration-300 flex items-center justify-center shadow-sm"
                  >
                    <FaXmark className="text-red-400" />
                  </motion.button>
                </div>
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

export default DoctorDashboard