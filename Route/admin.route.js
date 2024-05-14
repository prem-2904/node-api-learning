import express from "express";
import { createAdmin, getAdmins, updateAdmin, validateLogin } from "../controller/admin.controller.js";

const router = express.Router();

router.post('/createAdmin', createAdmin);

router.get('/getAdmins', getAdmins);

router.post('/updateAdmin', updateAdmin);

router.post('/validateAdmin', validateLogin);

export default router;