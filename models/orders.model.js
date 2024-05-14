import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        totalAmount: {
            type: String,
            required: true
        },
        typeOfPayment: {
            type: String,
            required: true
        },
        paymentOrderId: {
            type: String,
        },
        paymentTransactionId: {
            type: String,
        },
        orderFullName: {
            type: String,
            required: true
        },
        orderAddressLine1: {
            type: String,
            required: true
        },
        orderAddressLine2: {
            type: String,
        },
        orderAddressPincode: {
            type: Number,
            required: true
        },
        orderEmail: {
            type: String,
            required: true
        },
        orderPhone: {
            type: String,
            required: true
        },
        orderStatus: {
            type: String,
            required: true
        },
        // orderItems: {
        //     type: [Schema.Types.ObjectId],
        //     ref: 'orderItems',
        //     required: true
        // },
        orderedBy: {
            type: [Schema.Types.ObjectId],
            ref: "Patients",
            required: true
        },
        updatedBy: {
            type: [Schema.Types.ObjectId],
            ref: "Admins",
        },
        orderAmountPaid: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);


orderSchema.virtual('orderedItems', {
    ref: "orderItems",
    localField: "_id",
    foreignField: "orderId"
})

orderSchema.virtual('orderHistory', {
    ref: "order-history",
    localField: "_id",
    foreignField: "orderId"
});


export default mongoose.model("orders", orderSchema);