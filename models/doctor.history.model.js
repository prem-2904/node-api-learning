import mongoose, { Schema } from "mongoose";

const doctorSchema = mongoose.Schema(
    {
        doctorId: {
            type: [Schema.Types.ObjectId],
            ref: 'Doctors',
            required: true
        },
        documentName: {
            type: String,
            required: true
        },
        document: {
            type: String,
            required: true
        },
        uploadedBy: {
            type: [Schema.Types.ObjectId],
            ref: 'Doctors',
            required: true
        },
        uploadedOn: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
)