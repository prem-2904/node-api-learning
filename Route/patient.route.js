import express from "express";
import { createPatient, getPatientByID, getPatients, logout, updatePatient, validateLogin } from "../controller/patient.controller.js";

const router = express.Router();

router.post("/createPatient", createPatient);

router.get("/getPatients", getPatients);

router.get("/getPatient/:id", getPatientByID);

router.post("/validatePatient", validateLogin);

router.post("/updatePatient", updatePatient);

router.get('/logout', logout);

export default router;