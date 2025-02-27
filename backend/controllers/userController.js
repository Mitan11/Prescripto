import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

// api to register a user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validating all fields are provided
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // validating a email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // validating a strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating a user
        const userData = { name, email, password: hashedPassword }
        const newUser = new userModel(userData);

        // saving the user
        const user = await newUser.save();

        // generating a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to login a user
const loginUser = async (req, res) => {
    try {
        // getting the email and password from the body
        const { email, password } = req.body;

        // finding the user
        const user = await userModel.findOne({ email });

        // checking if the user is found
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // checking if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // checking if the password is valid
        if (isPasswordValid) {

            // generating a token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            // sending the response
            res.json({ success: true, token });
        } else {
            // sending the response
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to get the user details
const getProfile = async (req, res) => {
    try {
        // getting the user id from the body
        const { userId } = req.body;

        // finding the user
        const userData = await userModel.findById(userId).select("-password");

        // sending the response
        res.json({ success: true, userData });
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to update the user details
const updateProfile = async (req, res) => {
    try {
        // getting the user id from the body
        const { userId , name , address , gender , dob , phone } = req.body;

        // getting the image file from the body
        const imageFile = req.file;

        // checking if there are any changes to update
        if(!name || !gender || !dob || !phone || !address){
            return res.json({ success: false, message: "All fields are required" });
        }

        // updating the user details
        await userModel.findByIdAndUpdate(userId, { name , address:JSON.parse(address) , gender , dob , phone });

        // checking if the image file is provided
        if(imageFile){
            // uploading image to cloudinary
            const image = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            // getting the image url
            const imageUrl = image.secure_url;
            // updating the user image
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        // sending the response
        res.json({ success: true, message: "Profile updated successfully" });
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to book the appointments
const bookAppointment = async (req, res) => {
    try {
        // getting the user id from the body
        const { userId, docId, slotDate, slotTime } = req.body;

        // finding the doctor data
        const docData = await doctorModel.findById(docId).select("-password");

        // checking if the doctor is available
        if(!docData.available){
            return res.json({ success: false, message: "Doctor is not available at this time" });
        }

        // getting the slots booked
        let slotsBooked = docData.slots_booked;
        
        // checking if the slot is available
        if(slotsBooked[slotDate]){
            // checking if the slot is already booked
            if(slotsBooked[slotDate].includes(slotTime)){
                return res.json({ success: false, message: "Slot is already booked" });
            }else{
                // adding the slot to the slots booked
                slotsBooked[slotDate].push(slotTime);
            }
        }else{
            // creating a new slot
            slotsBooked[slotDate] = [];
            slotsBooked[slotDate].push(slotTime);
        }

        // getting the user data
        const userData = await userModel.findById(userId).select("-password");
        // removing the slots booked from the doctor data
        delete docData.slots_booked;

        // creating the appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        }

        // creating the appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // updating the slots booked
        await doctorModel.findByIdAndUpdate(docId, { slots_booked :slotsBooked });

        // sending the response
        res.json({ success: true, message: "Appointment booked successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to get the user appointments
const listAppointment = async (req, res) => {
    try {
        // getting the user id from the body
        const { userId } = req.body;

        // finding the user appointments
        const appointments = await appointmentModel.find({ userId });

        // sending the response
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to cancel the appointment
const cancelAppointment = async (req, res) => {
    try {
        // getting the appointment id from the body
        const { userId, appointmentId } = req.body;

        // finding the appointment data
        const appointmentData = await appointmentModel.findById(appointmentId);
        
        // checking if the user is the owner of the appointment
        if(appointmentData.userId !== userId){
            return res.json({ success: false, message: "Unauthorized action" });
        }

        // deleting the appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // getting the doctor id and the slot date and time from the appointment data
        const {docId , slotDate , slotTime} = appointmentData;

        // getting the doctor data
        const doctorData = await doctorModel.findById(docId);

        // getting the slots booked
        let slotsBooked = doctorData.slots_booked;

        // removing the slot from the slots booked
        slotsBooked[slotDate] = slotsBooked[slotDate].filter(e => e !== slotTime);

        // updating the doctor data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

        // sending the response
        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to make payment of an appointment using razorpay
const makePayment = async (req, res) => {
    try {
        // getting the appointment id from the body
        const {appointmentId} = req.body;

        // finding the appointment data
        const appointmentData = await appointmentModel.findById(appointmentId);

        // checking if the appointment is found and not cancelled
        if(!appointmentData || appointmentData.cancelled){
            return res.json({ success: false, message: "Appointment not found or cancelled" });
        }
        
        // updating the payment status
        await appointmentModel.findByIdAndUpdate(appointmentId, { payment : true });

        // sending the response
        res.json({ success: true, message: "Payment successful" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
export { registerUser, loginUser, getProfile, updateProfile , bookAppointment, listAppointment, cancelAppointment , makePayment};
