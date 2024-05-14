import mongoose, { Schema } from "mongoose";

const itemStocks = mongoose.Schema(
    {
        itemId: {
            type: String,
            ref: "medicineItems",
            required: true
        },
        itemPrice: {
            type: String,
            required: true
        },
        itemDiscount: {
            type: String,
            default: 0
        },
        stocksAvailability: {
            type: Number,
            required: true
        },
        expirationDate: {
            type: Date,
            required: true
        },
        stockFilledDate: {
            type: Date,
            required: true
        },
        updatedBy: {
            type: [Schema.Types.ObjectId],
            ref: 'Admins',
            required: true
        },
        isSaleCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('itemStocks', itemStocks);