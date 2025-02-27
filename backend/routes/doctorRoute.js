import express from "express";
import { doctorList, loginDoctor, appointmentsDoctor, appointmentCompleted, appointmentCancelled } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

// doctor router
const doctorRouter = express.Router();

// doctor login route
doctorRouter.post("/login", loginDoctor);

// getting all doctors route
doctorRouter.get("/list", doctorList);

// getting the doctor appointment route
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

// api to mark the appointment is completed
doctorRouter.post("/appointment-completed", authDoctor, appointmentCompleted);

// api to mark the appointment is cancelled
doctorRouter.post("/appointment-cancelled", authDoctor, appointmentCancelled);

export default doctorRouter;