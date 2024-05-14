import medicineGroup from "../models/medicine-group.model.js";
import { createError, createSuccess } from "../utils/reponseStruct.js";


export const createGroup = async (req, res, next) => {
    try {
        if (req.body) {
            const newGroup = new medicineGroup(
                {
                    groupname: req.body.groupname,
                    groupdesc: req.body.groupdesc,
                    groupimagepath: req.body.groupimagepath,
                    createdby: req.body.createdby,
                    isdeleted: false,
                }
            );

            await newGroup.save();
            return next(createSuccess(200, 'Medicine group created successfully'))
        }
        else {
            return next(createError(400, 'Bad data request'))
        }
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}

export const updateGroup = async (req, res, next) => {
    try {
        if (req.body) {
            const group = await medicineGroup.findById({ _id: req.body.id });
            if (!group) {
                return next(createError(404, 'No group found to update'));
            }

            await medicineGroup.findByIdAndUpdate(
                req.body.id,
                { $set: req.body.group },
                { $new: true }
            );

            return next(createSuccess(200, 'Group details updated'))
        }
        else {
            return next(createError(400, 'Bad data request'))
        }
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}

export const getGroups = async (req, res, next) => {
    try {
        const groups = await medicineGroup.find({})
            .populate({
                path: 'createdby', select: "name username email"
            })
        return next(createSuccess(200, '', groups))
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}

export const getGroupById = async (req, res, next) => {
    try {
        const group = await medicineGroup.find({ _id: req.params.id })
            .populate({
                path: 'createdby', select: "name username email"
            })
        return next(createSuccess(200, '', group))
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}