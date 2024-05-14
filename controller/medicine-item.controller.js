import medicineItem from "../models/medicine-item.model.js";
import { createError, createSuccess } from "../utils/reponseStruct.js";

export const createItem = async (req, res, next) => {
    try {
        if (!req.body) {
            return next(createError('400', 'Bad data request'));
        }

        const lastDataID = await medicineItem.findOne({}, null, { sort: { _id: -1 } });
        const lastCount = parseInt(lastDataID._id.substring(6));
        const nextCount = lastCount + 1;
        const previousID = nextCount.toString().padStart(6, '0');

        const item = new medicineItem({
            itemname: req.body.itemName,
            itemdesc: req.body.itemDesc,
            itembrand: req.body.itemBrand,
            itemusage: req.body.itemUsage,
            itemsideeffects: req.body.itemSideEffects,
            itemgroupid: req.body.itemGroup,
            itemprimaryimage: req.body.itemPrimaryImg,
            itemsecondaryimages: req.body.itemSecondaryImg,
            updatedby: req.body.updatedby,
            isdeleted: req.body.isdeleted,
            _id: `ITEM${previousID}`
        });

        await item.save();
        return next(createSuccess(201, 'Item added successfully'));
    } catch (error) {
        return next(createError(500, 'Something went wrong!' + error))
    }
}

export const updateItem = async (req, res, next) => {
    try {
        if (!req.body) {
            return next(createError(400, 'Bad data request'));
        }

        const itemID = await medicineItem.findById({ _id: req.body.id });

        if (!itemID) {
            return next(createError(404, 'Item not found!'));
        }

        const result = await medicineItem.findByIdAndUpdate(
            req.body.id,
            { $set: req.body.item },
            { $new: true }
        );
        return next(createSuccess(200, 'Item updated successfully'));

    } catch (error) {
        return next(createError(500, 'Something went wrong!' + error))
    }
}

export const getItems = async (req, res, next) => {
    try {
        let items = [];
        if (req.query.filter) {
            items = await medicineItem.find({ 'isdeleted': false, 'itemgroupid': req.query.filter })
                .populate({ path: 'itemgroupid', match: { 'isdeleted': false }, select: 'groupname groupdesc' })
                .populate({ path: 'updatedby', select: 'username email name' })
                .populate('itemstockavailability');
        }
        else {
            items = await medicineItem.find({ 'isdeleted': false })
                .populate({ path: 'itemgroupid', match: { 'isdeleted': false }, select: 'groupname groupdesc' })
                .populate({ path: 'updatedby', select: 'username email name' })
                .populate('itemstockavailability');
        }
        return next(createSuccess(200, '', { items, totalCount: items.length }));
    } catch (error) {
        return next(createError(500, 'Something went wrong!' + error))
    }
}

export const getItemsByID = async (req, res, next) => {
    try {
        const item = await medicineItem.find({ 'isdeleted': false, _id: req.params.id })
            .populate({ path: 'itemgroupid', match: { 'isdeleted': false }, select: 'groupname groupdesc' })
            .populate({ path: 'updatedby', select: 'username email name' })
            .populate('itemstockavailability');

        return next(createSuccess(200, '', item));
    } catch (error) {
        return next(createError(500, 'Something went wrong!' + error))
    }
}
