import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
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
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});

patientSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    // Define a transform function for this individual schema type. Only called when calling toJSON() or toObject().
    transform: (doc, res) => {
        delete res.password
    }
});

export default mongoose.model("Patients", patientSchema);