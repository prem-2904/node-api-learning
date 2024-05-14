import express from "express";
import { createDoctor, getDoctorByID, getDoctors, updateDoctor, validateLogin } from "../controller/doctor.controller.js";

const router = express.Router();

router.post("/createDoctor", createDoctor);

router.get("/getDoctors", getDoctors);

router.get("/getDoctor/:id", getDoctorByID);

router.post("/validateDoctor", validateLogin);

router.post("/updateDoctor", updateDoctor);

export default router;