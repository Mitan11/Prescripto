import express from "express";
import { addDoctor, allDoctors, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

// admin router
const adminRouter = express.Router();

// adding a doctor with image upload route
adminRouter.post('/add-doctor',  authAdmin ,upload.single('image'), addDoctor)

// login admin route
adminRouter.post('/login', loginAdmin)

// getting all doctors
adminRouter.post('/all-doctors', authAdmin, allDoctors)

// changing the availability of a doctor
adminRouter.post('/change-availability', authAdmin, changeAvailability)

export default adminRouter;