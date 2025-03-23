import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";

// api to change the availability of a doctor
const changeAvailability = async (req, res) => {
    try {
        // getting the doctor id
        const { docId } = req.body;

        // finding the doctor
        const docData = await doctorModel.findById(docId);

        // updating the availability
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

        res.json({
            success: true,
            message: "Availability changed successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// api to get all doctors
const doctorList = async (req, res) => {
    try {
        // getting all doctors
        const doctors = await doctorModel.find({}).select(["-password", "-email"]);
        res.json({
            success: true,
            doctors
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// api for doctor login
const loginDoctor = async (req, res) => {
    try {
        // getting the email and password from the request body
        const { email, password } = req.body;

        // finding the doctor
        const doctor = await doctorModel.findOne({ email });

        // checking if the doctor exists
        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        // checking if the password is correct
        const isMatch = await bcrypt.compare(password, doctor.password);

        // if the password is correct
        if (isMatch) {
            // generating the token for the doctor
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            // sending the response
            res.json({ success: true, message: "Logged in successfully", token })
        } else {
            // if the password is incorrect
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to get the doctor appointment for each doctor
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body

        // getting the appointments
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to mark the appointment is completed
const appointmentCompleted = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        // finding the appointment
        const appointmentData = await appointmentModel.findById(appointmentId)

        // checking if the appointment is completed
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment completed successfully" })
        } else {
            return res.json({ success: false, message: "marking appointment as completed failed" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to mark the appointment is cancelled
const appointmentCancelled = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        // finding the appointment
        const appointmentData = await appointmentModel.findById(appointmentId)

        // checking if the appointment is completed
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment cancelled successfully" })
        } else {
            return res.json({ success: false, message: "marking appointment as cancelled failed" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to get dashboard data
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body

        // getting the appointments
        const appointments = await appointmentModel.find({ docId })

        // getting the rating
        const doctorData = await doctorModel.findById(docId).select("averageRating ratingCount")

        // calculating the earnings
        let earnings = 0
        appointments.map(item => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        // calculating the total patients
        let patients = []
        appointments.map(item => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        // calculating the rating
        const totalRating = doctorData.averageRating * doctorData.ratingCount

        const dashData = {
            earnings,
            patients: patients.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5),
            rating: totalRating / doctorData.ratingCount
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to get the doctor profile
const doctorProfile = async (req, res) => {
    try {
        // getting the doctor id
        const { docId } = req.body

        // getting the doctor profile
        const profileData = await doctorModel.findById(docId).select("-password")

        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//  api to update the doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        // getting the doctor id
        const { docId, fees, address, available } = req.body
        console.log(docId, fees, address, available);
        // updating the doctor profile
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: "Profile updated successfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCompleted, appointmentCancelled, doctorDashboard, doctorProfile, updateDoctorProfile };
