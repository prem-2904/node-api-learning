import orderItemsModel from "../models/orderItems.model.js";
import ordersModel from "../models/orders.model.js";
import addToCartModel from "../models/addToCart.model.js";
import orderHistoryModel from "../models/order-history.model.js";
import dotenv from 'dotenv';
import razorpay from "razorpay";
import { createError, createSuccess } from "../utils/reponseStruct.js";
import { updateStocksOnOrder } from "./item-stock.controller.js";
dotenv.config();

const rpInstance = new razorpay({
    key_secret: process.env.KEY_SECRET,
    key_id: process.env.KEY_ID
});

const ORDERSTATUS = [
    {
        id: "ordered",
        name: "Ordered",
        order: 1,
        orderComments: "Order placed!"
    },
    {
        id: "shipped",
        name: "Shipped",
        order: 2,
        orderComments: "Your order shipped"
    },
    {
        id: "in-transit",
        name: "In-Transit",
        order: 3,
        orderComments: "Your order moved out from the Hub"
    },
    {
        id: "outfordelivery",
        name: "Out for Delivery",
        order: 4,
        orderComments: "Your order Out for Delivery"
    },
    {
        id: "delivered",
        name: "Delivered",
        order: 5,
        orderComments: "Order Delivered"
    },
    {
        id: "returninitiated",
        name: "Return Initiated",
        order: 6,
        orderComments: "Return order placed & Pick-up scheduled"
    },
    {
        id: "returned",
        name: "Returned & Refund Initiated",
        order: 7,
        orderComments: "Item picked up & refund initiated!"
    },
    {
        id: "refunded",
        name: "Refund Completed",
        order: 8,
        orderComments: "Refund completed"
    },

];

export const createOrder = async (req, res, next) => {
    try {
        if (!req.body) {
            return next(createSuccess(400, 'Bad data request'));
        }

        const options = {
            "amount": req.body.amount,
            "currency": "INR",
            "receipt": "Hospital Mgmt-User purchase",
            "notes": req.body.notes
        };

        await rpInstance.orders.create(options, (err, data) => {
            if (err) {
                return next(createError(500, 'Something went wrong with payment gateway' + err))
            }

            return next(createSuccess(201, 'Order created!', data));
        })
    } catch (error) {
        return next(createError(500, error))
    }
}


export const createTransactionAndOrderDetails = async (req, res, next) => {
    try {

        const lastDataID = await ordersModel.findOne({}, null, { sort: { _id: -1 } });
        const lastCount = parseInt(lastDataID._id.substring(5));
        const nextCount = lastCount + 1;
        const previousID = nextCount.toString().padStart(6, '0');

        const orderDetails = {
            _id: `ORDER${previousID}`,
            // _id: `ORDER000001`,
            totalAmount: req.body.totalAmount,
            typeOfPayment: req.body.typeOfPayment,
            paymentOrderId: req.body.paymentOrderId,
            paymentTransactionId: req.body.paymentTransactionId,
            orderFullName: req.body.orderFullName,
            orderAddressLine1: req.body.orderAddressLine1,
            orderAddressLine2: req.body.orderAddressLine2,
            orderAddressPincode: req.body.orderAddressPincode,
            orderEmail: req.body.orderEmail,
            orderPhone: req.body.orderPhone,
            orderStatus: req.body.orderStatus == 'inperson' ? 'delivered' : "ordered",
            orderedBy: req.body.orderedBy,
            updatedBy: req.body.updatedBy,
            orderAmountPaid: req.body.orderAmountPaid
        };

        //To create records for order details
        const orders = new ordersModel(orderDetails);
        const orderCreated = await orders.save();

        //To create records order history
        const historyPayload = {
            orderId: orderCreated._id,
            status: req.body.orderStatus == 'inperson' ? 'delivered' : "ordered",
            statusUpdatePlace: "NA"
        };
        const orderHistory = new orderHistoryModel(historyPayload);
        await orderHistory.save();

        //To create records for Ordered items
        const orderItems = req.body.orderItems;
        for (let i = 0; i < orderItems.length; i++) {
            let itemsPayload = {
                "orderItem": orderItems[i].orderItem,
                "orderedQuantity": orderItems[i].orderedQuantity,
                "orderItemPrice": orderItems[i].orderItemPrice,
                "orderTotal": orderItems[i].orderTotal,
                "orderStatus": req.body.orderStatus == 'inperson' ? 'delivered' : "ordered",
                "orderId": orderCreated._id,
                "orderStockId": orderItems[i].itemStockId
            }
            const orderItemsSave = new orderItemsModel(itemsPayload);
            await orderItemsSave.save();

            const cartId = await addToCartModel.findById({ _id: orderItems[i].cartId });
            if (cartId) {
                await addToCartModel.findByIdAndUpdate(
                    cartId._id,
                    { $set: { isDeleted: true } },
                )
            }
            const inputPayload = {
                stockId: orderItems[i].itemStockId,
                orderedQuantity: orderItems[i].orderedQuantity
            }
            await updateStocksOnOrder(inputPayload);
        }
        return next(createSuccess(201, 'Order created successfully', orderDetails))
    } catch (error) {
        return next(createError(500, error))
    }
}


export const getUsersOrder = async (req, res, next) => {
    try {
        const orders = await ordersModel.find({ orderedBy: req.params.id })
            .populate("orderedBy")
            .populate("orderedItems")
            .populate("orderHistory")
        return next(createSuccess(200, '', orders))
    } catch (error) {
        return next(createError(500, error))
    }
}

export const getOrderForAdmins = async (req, res, next) => {
    try {
        const orders = await ordersModel.find()
            .populate("orderedBy")
            .populate("orderedItems")
            .populate("updatedBy")
            .populate("orderHistory")
        return next(createSuccess(200, '', orders))
    } catch (error) {
        return next(createError(500, error))
    }
}

export const getOrderBasedId = async (req, res, next) => {
    try {
        const orders = await ordersModel.find({ _id: req.body.orderId })
            .populate("orderedBy")
            .populate({ path: "orderedItems", populate: { path: "orderItem" } })
            .populate("updatedBy")
            .populate("orderHistory")
        return next(createSuccess(200, '', orders))
    } catch (error) {
        return next(createError(500, error))
    }
}

export const getOrdersOverview = async (req, res, next) => {
    try {
        let orders;
        if (req.query.id) {
            orders = await ordersModel.find({ orderedBy: req.query.id })
                .populate("orderedBy")
                .populate("updatedBy")
        }
        else {
            orders = await ordersModel.find()
                .populate("orderedBy")
                .populate("updatedBy")
        }

        return next(createSuccess(200, '', orders))
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}

export const updateOrderStatus = async (req, res, next) => {
    try {
        const currentOrder = await ordersModel.find({ _id: req.body.id });
        let getOrderStatus = currentOrder[0].orderStatus;
        let currentOrderStatus = ORDERSTATUS.findIndex(os => os.id == getOrderStatus);
        let currenOrderNo = ORDERSTATUS[currentOrderStatus].order;
        let updateOrderNo = ORDERSTATUS.findIndex(os => os.order == (currenOrderNo + 1));
        let updateOrderStatus = ORDERSTATUS[updateOrderNo];

        const payload = {
            "id": req.body.id,
            "orderHistory": {
                "nextStatus": updateOrderStatus.id,
                "statusUpdatePlace": updateOrderStatus.orderComments
            },
            "order": {
                "orderStatus": updateOrderStatus.id,
                "orderAmountPaid": req.body?.orderAmountPaid
            }
        }

        const orderRes = await ordersModel.findByIdAndUpdate(
            req.body.id,
            { $set: payload.order },
            { $new: true }
        );

        const itemsUpdateRes = await orderItemsModel.updateMany({ orderId: payload.id }, { orderStatus: payload.order.orderStatus });

        const historyPayload = {
            orderId: payload.id,
            status: payload.orderHistory.nextStatus,
            statusUpdatePlace: payload.orderHistory.statusUpdatePlace
        };

        const orderHistory = new orderHistoryModel(historyPayload);
        const orderHistoryRes = await orderHistory.save();

        return next(createSuccess(200, `Your order moved to ${updateOrderStatus.name}`, { orderRes, itemsUpdateRes, orderHistoryRes }));
    } catch (error) {
        return next(createError(500, error))
    }
}