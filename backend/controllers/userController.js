import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import nodemailer from "nodemailer";
import reviewModel from "../models/reviewModel.js";

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

const contactUs = async (req, res) => {
    try {
        // Extracting user details from the request body
        const { name, email, message } = req.body;

        // Check if all fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if EMAIL and PASSWORD are configured
        if (!process.env.EMAIL || !process.env.PASSWORD) {
            return res.status(500).json({ success: false, message: "Email configuration missing" });
        }

        // Setting up the email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        // Mail options
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.TOEMAIL,
            subject: `${name} Contacted via Website`,
            text: `From: ${name} (${email})\n\nMessage:\n${message}`,
        };

        // Sending email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
};

const addReview = async (req, res) => {
    try {
        const { userId, doctorId, rating, comment, appointmentId } = req.body;

        // check if appointment is found and not cancelled
        const appointment = await appointmentModel.findOne({
            _id: appointmentId,
            userId: userId,
            isCompleted: true
        });

        if (!appointment || appointment.cancelled) {
            return res.status(400).json({ success: false, message: "Appointment not found or cancelled" });
        }

        // Check if all required fields are provided
        if (!userId || !doctorId || !rating || !comment || !appointmentId) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if doctor exists
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const existingReview = await reviewModel.findOne({ appointment: appointmentId });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "Review already exists for this appointment"
            });
        }

        // Create new review
        const review = new reviewModel({
            user: userId,
            doctor: doctorId,
            appointment: appointmentId,
            rating,
            comment
        });

        // Save review
        await review.save();

        res.status(201).json({ success: true, message: "Review added successfully" });
    } catch (error) {
        console.error("Error adding review:", error.message);
        res.status(500).json({ success: false, message: "Failed to add review" });
    }
};

const getReviewedAppointments = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find all reviews by this user
        const reviews = await reviewModel.find({ user: userId });
        
        // Extract appointment IDs from the reviews
        const reviewedAppointmentIds = reviews.map(review => review.appointment.toString());

        res.status(200).json({ 
            success: true, 
            reviewedAppointmentIds 
        });
    } catch (error) {
        console.error("Error fetching reviewed appointments:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch reviewed appointments" });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const { doctorId } = req.query;
        
        // Create query object
        const query = {};
        if (doctorId) {
            query.doctor = doctorId;
        }
        
        // Fetch reviews with optional doctor filter
        const reviews = await reviewModel.find(query)
            .sort({ createdAt: -1 })    
            .populate('user', 'name image')
            .populate('doctor', 'name speciality image');

        res.status(200).json({ 
            success: true, 
            reviews 
        });
    } catch (error) {
        console.error("Error fetching reviews:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, makePayment, contactUs, addReview, getReviewedAppointments, getAllReviews };
