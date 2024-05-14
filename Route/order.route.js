import express from "express";
import { createOrder, createTransactionAndOrderDetails, getOrderBasedId, getOrderForAdmins, getOrdersOverview, getUsersOrder, updateOrderStatus } from "../controller/orders.controller.js";

const router = express.Router();

router.post("/createPaymentOrder", createOrder);

router.post("/createOrderAndTransaction", createTransactionAndOrderDetails);

router.get("/getUsersOrder/:id", getUsersOrder);

router.get("/getOrdersForAdmin", getOrderForAdmins);

router.post("/updateOrder", updateOrderStatus);

router.get("/getOrdersoverview", getOrdersOverview);

router.post("/getOrderById", getOrderBasedId);

export default router;