import { createError, createSuccess } from "../utils/reponseStruct.js";
import DOCTOR from "../models/doctor.model.js";
import jwt from 'jsonwebtoken';

export const createDoctor = async (req, res, next) => {
    try {
        if (req.body) {
            const users = new DOCTOR({
                username: req.body.username,
                email: req.body.email,
                fName: req.body.fName,
                lName: req.body.lName,
                dob: req.body.dob,
                gender: req.body.gender,
                password: req.body.password,
                contactNo: req.body.contactNo,
                qualification: req.body.qualification,
                specilization: req.body.specilization,
                availablityTimings: req.body.availablityTimings,
                workingDays: req.body.workingDays,
                isDeleted: req.body.isDeleted,
                doctorApprovalStatus: req.body.doctorApprovalStatus,
                doctorApprovalReason: req.body.doctorApprovalReason,
                totalExp: req.body.totalExp,
                totalSurgicalExp: req.body.totalSurgicalExp
            })
            await users.save();
            return next(createSuccess(201, 'Doctor registration completed'));
        }
        else {
            return next(createError(400, 'Missing required fields'));
        }
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`));
    }
}

export const getDoctors = async (req, res, next) => {
    try {
        const users = await DOCTOR.find({});
        if (!users) {
            return next(createError(404, 'No data found!'));
        }
        return next(createSuccess(200, '', users))
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`));
    }
}

export const getDoctorByID = async (req, res, next) => {
    try {
        const patientID = req.params.id;
        const patient = await DOCTOR.findById({ _id: patientID });
        if (patient) {
            return next(createSuccess(200, '', patient));
        }
        return next(createError(404, 'Doctor not found'));
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`))
    }
}

export const validateLogin = async (req, res, next) => {
    try {
        if (req.body) {
            const doctor = await DOCTOR.findOne(
                {
                    $or: [{ 'username': req.body.username }, { 'email': req.body.username }],
                    $and: [{ 'password': req.body.password }]
                });
            if (doctor) {
                if (doctor?.doctorApprovalStatus != 'verified') {
                    return next(createError(401, `You're account verification in-progress. Please contact your admin! ${patient.doctorApprovalStatus}`));
                }

                const jwtToken = jwt.sign({ doctor, role: 'doctor' }, process.env.JWT_SECRET, {
                    expiresIn: '2h'
                });

                res.cookie('access-token', jwtToken, { httpOnly: true });

                return next(createSuccess(200, '', { doctor, role: 'doctor' }))
            }

            return next(createError(404, 'Invalid Credentials'));
        }
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`))
    }
}

export const updateDoctor = async (req, res, next) => {
    try {
        if (req.body) {
            const doctor = await DOCTOR.findById({ _id: req.body.id });
            if (doctor) {
                await DOCTOR.findByIdAndUpdate(
                    req.body.id,
                    { $set: req.body.doctor },
                    { new: true }
                )
                return next(createSuccess(200, 'Doctor updation successful!'));
            }
            else {
                return next(createError(404, 'Doctor not found'));
            }
        }
        else {
            return next(createError(404, 'Bad data request!'));
        }
    } catch (error) {
        return next(createError(500, `Internal server error ${error}`))
    }
}