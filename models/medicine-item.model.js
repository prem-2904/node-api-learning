import mongoose, { Schema } from "mongoose";

const medicineItem = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        itemname: {
            type: String,
            required: true
        },
        itemdesc: {
            type: String,
            required: true
        },
        itembrand: {
            type: String,
            required: true
        },
        itemusage: {
            type: String,
            required: true
        },
        itemsideeffects: {
            type: String,
            required: true
        },
        itemgroupid: {
            type: [Schema.Types.ObjectId],
            ref: "medicinegroups",
            required: true
        },
        itemprimaryimage: {
            type: String,
            required: true,
        },
        itemsecondaryimages: [{
            type: String, // Assuming string URLs or base64-encoded data
            required: true // If images are mandatory
        }],
        // itemstockavailability: {
        //     type: [Schema.Types.ObjectId],
        //     ref: 'itemStocks',
        // },
        updatedby: {
            type: [Schema.Types.ObjectId],
            ref: "Admins",
            required: true
        },
        isdeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

medicineItem.virtual('itemstockavailability', {
    ref: 'itemStocks',
    localField: '_id',
    foreignField: 'itemId',
    //  count: true, // only we'll get no.of counts
    select: 'stocksAvailability stockFilledDate expirationDate',
    match: { isSaleCompleted: false }
});

export default mongoose.model("medicineItems", medicineItem)