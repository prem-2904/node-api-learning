import mongoose, { Schema } from 'mongoose';

const notificationSchema = mongoose.Schema(
    {
        userId: {
            type: [Schema.Types.ObjectId],
            required: true,
        },
        notificationHeader: {
            type: String,
            required: true
        },
        notificationMsg: {
            type: String,
            required: true
        },
        isRead: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    });

export default mongoose.model("notification", notificationSchema);