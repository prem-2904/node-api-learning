import mongoose, { Schema } from "mongoose";


const pharmacySchema = new Schema(
    {
        _id: {
            type: String,
            unique: true,
            required: true
        },
        pharmacyName: {
            type: String,
            required: true,
        },
        pharmacyArea: {
            type: String,
            required: true
        },
        pharmacyPincode: {
            type: Number,
            required: true
        },
        pharmacyContact: {
            type: String,
            required: true
        },
        pharmacyPOCName: {
            type: String,
            required: true
        },
        pharmacyPOCContact: {
            type: String,
            required: true
        },
        pharmacysecondaryPOCName: {
            type: String,
        },
        pharmacysecondaryPOCContact: {
            type: String,
        },
        isActive: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

export default mongoose.model("pharmacy", pharmacySchema);