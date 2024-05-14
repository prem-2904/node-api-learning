import express from 'express';
import { addPharmacy, getPharmacy, updatePharmacy } from '../controller/pharmacy.controller.js';

const router = express.Router();

router.get("/getpharmacy", getPharmacy);

router.post("/addpharmacy", addPharmacy);

router.post("/updatepharmacy", updatePharmacy);


export default router;