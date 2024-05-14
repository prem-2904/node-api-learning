import Admin from "../models/admin.model.js";
import { createError, createSuccess } from "../utils/reponseStruct.js";
import jwt from 'jsonwebtoken';

export const createAdmin = async (req, res, next) => {
    try {
        if (req.body) {
            const adminNew = new Admin(
                {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    isdeleted: req.body.isdeleted,
                    actionby: req.body.actionby
                }
            );

            await adminNew.save();
            return next(createSuccess(200, 'Admin account added successfully'))
        }
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}

export const updateAdmin = async (req, res, next) => {
    try {
        if (req.body) {
            const admin = Admin.findById({ _id: req.body.id });
            if (!admin) {
                return next(createError(404, 'User not found!'));
            }

            await Admin.findByIdAndUpdate(
                req.body.id,
                { $set: req.body.admin },
                { $new: true }
            )

            return next(createSuccess(201, 'Admin details updated successfully'));
        }
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}

export const getAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find({ 'isdeleted': false });
        return next(createSuccess(200, '', admins))
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}

export const validateLogin = async (req, res, next) => {
    try {
        if (req.body) {
            const admin = await Admin.findOne(
                {
                    $or: [{ 'username': req.body.username }, { 'email': req.body.username }],
                    $and: [{ 'password': req.body.password }]
                });
            if (admin) {
                const jwtToken = jwt.sign({ admin, role: 'admin' }, process.env.JWT_SECRET, {
                    expiresIn: '2h'
                });

                res.cookie('access-token', jwtToken, { httpOnly: true });

                return next(createSuccess(200, '', { admin, role: 'admin' }))
            }
            return next(createError(401, 'Invalid Credentials'));
        }
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`))
    }
}