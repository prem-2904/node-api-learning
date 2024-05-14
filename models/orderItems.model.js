import mongoose, { Schema } from "mongoose";

const orderItemsSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true
        },
        orderItem: {
            type: String,
            ref: "medicineItems",
            required: true
        },
        orderStockId: {
            type: String,
            ref: "itemStocks",
            required: true
        },
        orderedQuantity: {
            type: Number,
            required: true
        },
        orderItemPrice: {
            type: String,
            required: true
        },
        orderTotal: {
            type: String,
            required: true
        },
        orderStatus: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('orderItems', orderItemsSchema);
