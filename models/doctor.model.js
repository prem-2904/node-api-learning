import mongoose, { Schema } from "mongoose";

const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    specilization: {
        type: String,
        required: true
    },
    availablityTimings: {
        type: String,
        required: true
    },
    workingDays: {
        type: String,
        required: true
    },
    chargePerConsult: {
        type: String,
        required: true,
        default: "10.00"
    },
    totalExp: {
        type: Number,
        required: true
    },
    totalSurgicalExp: {
        type: Number,
        required: true
    },
    doctorApprovalStatus: {
        type: String,
        required: true,
        default: "pending"
    },
    doctorApprovalReason: {
        type: String,
        required: true,
        default: 'NA'
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});

doctorSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    // Define a transform function for this individual schema type. Only called when calling toJSON() or toObject().
    transform: (doc, res) => {
        delete res.password
    }
});

export default mongoose.model("Doctors", doctorSchema);