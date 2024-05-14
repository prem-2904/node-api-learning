import { createError, createSuccess } from "../utils/reponseStruct.js";
import PATIENT from "../models/patient.model.js";
import jwt from "jsonwebtoken";

export const createPatient = async (req, res, next) => {
    try {
        if (req.body) {
            const users = new PATIENT({
                username: req.body.username,
                email: req.body.email,
                fName: req.body.fName,
                lName: req.body.lName,
                dob: req.body.dob,
                gender: req.body.gender,
                password: req.body.password,
                contactNo: req.body.contactNo,
                isDeleted: req.body.isDeleted,
            })
            await users.save();
            return next(createSuccess(201, 'Patient registration completed'));
        }
        else {
            return next(createError(400, 'Missing required fields'));
        }
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`));
    }
}

export const getPatients = async (req, res, next) => {
    try {
        const users = await PATIENT.find({});
        if (!users) {
            return next(createError(404, 'No data found!'));
        }
        return next(createSuccess(200, '', users))
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`));
    }
}

export const getPatientByID = async (req, res, next) => {
    try {
        const patientID = req.params.id;
        const patient = await PATIENT.findById({ _id: patientID });
        if (patient) {
            return next(createSuccess(200, '', patient));
        }
        return next(createError(404, 'Patient not found'));
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`))
    }
}

export const validateLogin = async (req, res, next) => {
    try {
        if (req.body) {
            const patient = await PATIENT.findOne(
                {
                    $or: [{ 'username': req.body.username }, { 'email': req.body.username }],
                    $and: [{ 'password': req.body.password }]
                })
            if (patient) {
                const jwtToken = jwt.sign({ patient, role: 'patient' }, process.env.JWT_SECRET, {
                    expiresIn: '2h'
                });

                res.cookie('access-token', jwtToken, { httpOnly: true });

                return next(createSuccess(200, '', { patient, role: 'patient' }))

            }
            return next(createError(401, 'Invalid Credentials'));
        }
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`))
    }
}

export const updatePatient = async (req, res, next) => {
    try {
        if (req.body) {
            const patient = await PATIENT.findById({ _id: req.body.id });
            if (patient) {
                await PATIENT.findByIdAndUpdate(
                    req.body.id,
                    { $set: req.body.patient },
                    { new: true }
                )
                return next(createSuccess(200, 'Patient updation successful!'));
            }
            else {
                return next(createError(404, 'Patient not found'));
            }
        }
        else {
            return next(createError(404, 'Patient not found!'));
        }
    } catch (error) {
        return next(createError(500, `Internal server error ${error}`))
    }
}


export const logout = (req, res, next) => {
    try {
        res.clearCookie('access-token');
        return next(createSuccess(200, 'User logged out success'));
    } catch (error) {
        return next(createError(500, 'Something went wrong - ' + error))
    }
}