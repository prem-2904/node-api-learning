import mongoose, { Schema } from "mongoose";

const medicineGroupSchema = mongoose.Schema(
    {
        groupname: {
            type: String,
            required: true
        },
        groupdesc: {
            type: String,
            required: true
        },
        groupimagepath: {
            type: String,
            required: true
        },
        createdby: {
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
        timestamps: true
    }
)

export default mongoose.model('medicinegroups', medicineGroupSchema);