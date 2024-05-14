import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        statusUpdatePlace: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("order-history", orderHistorySchema);