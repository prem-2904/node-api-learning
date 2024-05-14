import mongoose, { Schema } from "mongoose";

const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isdeleted: {
            type: Boolean,
            required: true,
            default: false
        },
        actionby: {
            type: [Schema.Types.ObjectId],
            ref: "Admins",
            required: true
        }
    },
    {
        timestamps: true
    }
);

adminSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    // Define a transform function for this individual schema type. Only called when calling toJSON() or toObject().
    transform: (doc, res) => {
        delete res.password
    }
});
export default mongoose.model('Admins', adminSchema)