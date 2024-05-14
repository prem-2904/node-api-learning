import express from 'express';
import { createGroup, getGroupById, getGroups, updateGroup } from '../controller/medicine-group.controller.js';


const router = express.Router();

router.post('/creategroup', createGroup);

router.get('/getgroups', getGroups);

router.get('/getgroupbyid/:id', getGroupById);

router.post('/updategroup', updateGroup);

export default router;