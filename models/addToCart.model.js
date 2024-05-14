import mongoose, { Schema } from "mongoose";

export const addToCartSchema = new mongoose.Schema(
    {
        userId: {
            type: [Schema.Types.ObjectId],
            ref: 'patient',
            required: true,
        },
        itemId: {
            type: String,
            ref: 'medicineItems'
        },
        addedToCart: {
            type: Boolean,
            required: true
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

addToCartSchema.virtual('itemstockavailability', {
    ref: 'itemStocks',
    localField: 'itemId',
    foreignField: 'itemId',
    //  count: true, // only we'll get no.of counts
    select: 'stocksAvailability stockFilledDate expirationDate'
});

export default mongoose.model("cart-patient", addToCartSchema);