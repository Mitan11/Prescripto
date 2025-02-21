import express from "express";
import { doctorList } from "../controllers/doctorController.js";

// doctor router
const doctorRouter = express.Router();

// getting all doctors route
doctorRouter.get("/list", doctorList);

export default doctorRouter;