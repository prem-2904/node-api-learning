import express from 'express';
import { addNotification, getNotifications, updateNotification } from '../controller/notification.controller.js';

const router = express.Router();

router.post('/addnotification', addNotification);

router.get('/notifications/:userId', getNotifications);

router.post('/updatenotifications', updateNotification);

export default router;