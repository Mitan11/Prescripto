import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const AdminContext = createContext()

const AdminContextProvider = (props)=>{

    const [aToken , setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors , setDoctors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [appointments , setAppointments] = useState([])

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/all-doctors", {},{headers:{aToken}})
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/change-availability", { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }

    const getAllAppointments = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + "/api/admin/all-appointments", {headers:{aToken}})
            if (data.success) {
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
          const {data} = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, {appointmentId}, {
            headers: {
              aToken
            }
          })
          if(data.success){
            toast.success(data.message)
            getAllAppointments()
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
      }

    const value = {
        aToken , setAToken , backendUrl , doctors , getAllDoctors , changeAvailability , appointments , getAllAppointments , setAppointments , cancelAppointment
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider