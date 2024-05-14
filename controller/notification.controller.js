import notificationModel from "../models/notification.model.js";
import { createError, createSuccess } from "../utils/reponseStruct.js";


export const addNotification = async (req, res, next) => {
    try {
        notificationAdd(req.body);
        return next(createSuccess(201, 'Notification Added!'));
    } catch (error) {
        return next(createError(500, 'Notification ' + error.message))
    }
}

export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await notificationModel.find({ userId: req.params.userId, isRead: false });
        if (notifications) {
            const notifyList = {
                notificationsList: notifications,
                notificationsCount: notifications.length
            }
            return next(createSuccess(200, '', notifyList));
        }
    } catch (error) {
        return next(createError(500, 'Notification ' + error.message))
    }
}

export const updateNotification = async (req, res, next) => {
    try {
        if (req.body) {
            await notificationModel.findByIdAndUpdate(
                req.body.id,
                { $set: req.body.notify }
            );
            return next(createSuccess(200, 'Notification updated!'))
        } else {
            return next(401, 'Bad data request!');
        }
    } catch (error) {
        return next(createError(500, 'Notification ' + error.message))
    }
}

export const notificationAdd = async (payload) => {
    const notify = new notificationModel({
        notificationHeader: payload.notificationHeader,
        notificationMsg: payload.notificationHeader,
        isRead: false,
        userId: payload.userId,
    });
    await notify.save();
}