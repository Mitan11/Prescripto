import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");

    const [appointments, setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/appointments`, { headers: { dtoken: dToken } })
            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completedAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctor/appointment-completed`, { appointmentId }, { headers: { dtoken: dToken } })
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelledAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctor/appointment-cancelled`, { appointmentId }, { headers: { dtoken: dToken } })
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        dToken,
        setDToken,
        appointments,
        setAppointments,
        getAppointments,
        completedAppointment,
        cancelledAppointment
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider