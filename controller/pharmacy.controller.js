import pharmacyModel from "../models/pharmacy.model.js";
import { createError, createSuccess } from "../utils/reponseStruct.js";

export const getPharmacy = async (req, res, next) => {
    try {
        const list = await pharmacyModel.find({});
        return next(createSuccess(200, '', { pharmacy: list, totalCount: list.length }));
    } catch (error) {
        return next(createError(500, error))
    }
}

export const addPharmacy = async (req, res, next) => {
    try {
        if (req.body) {
            const lastDataID = await pharmacyModel.findOne({}, null, { sort: { _id: -1 } });
            const lastCount = parseInt(lastDataID._id.substring(6));
            const nextCount = lastCount + 1;
            const previousID = nextCount.toString().padStart(6, '0');

            const pharmacy = new pharmacyModel({
                _id: `PHARMA${previousID}`,
                pharmacyName: req.body.pharmacyName,
                pharmacyArea: req.body.pharmacyArea,
                pharmacyPincode: req.body.pharmacyPincode,
                pharmacyContact: req.body.pharmacyContact,
                pharmacyPOCName: req.body.pharmacyPOCName,
                pharmacyPOCContact: req.body.pharmacyPOCContact,
                pharmacysecondaryPOCName: req.body.pharmacysecondaryPOCName,
                pharmacysecondaryPOCContact: req.body.pharmacysecondaryPOCContact,
                isActive: true
            });

            await pharmacy.save();
            return next(createSuccess(201, 'Pharmacy added!'))
        }
    } catch (error) {
        return next(createError(500, error))
    }
}

export const updatePharmacy = async (req, res, next) => {
    try {
        if (req.body) {
            const isExist = await pharmacyModel.find({ _id: req.body.id });

            if (isExist) {
                await pharmacyModel.findByIdAndUpdate(
                    req.body.id,
                    { $set: req.body.pharmacy },
                    { $new: true }
                );

                return next(createSuccess(200, 'Pharmacy details updated!'));
            }

            return next(createError(404, 'Pharmacy details not found'))
        } else {
            return next(createError(401, 'Bad data request'));
        }
    } catch (error) {
        return next(createError(500, error))
    }
}