import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';

import patientRoutes from './Route/patient.route.js';
import doctorRoutes from './Route/doctor.route.js';
import adminRoutes from './Route/admin.route.js';
import medicineGroupsRoutes from './Route/medicine-group.route.js';
import medicineItemRoutes from './Route/medicine-item.route.js';
import itemStocksRoutes from './Route/item-stock.route.js';
import wishListRoutes from './Route/wishlist.route.js';
import orderRoutes from './Route/order.route.js';
import pharmacyRoutes from './Route/pharmacy.route.js';
import cookieParser from 'cookie-parser';
import notificationRoutes from './Route/notification.route.js';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8000;

server.use(cors(
    {
        credentials: true,
        origin: ['http://localhost:4200', 'https://hospital-mgmt-sand.vercel.app', 'https://hospital-mgmt-khk8hzfzb-premlearning29.vercel.app', 'https://hospital-mgmt-khk8hzfzb-premlearning29.vercel.app']
    }
));

server.use(express.json());

server.use(cookieParser());

// server.use(cookieSession({
//     name: 'auth-session',
//     keys: [process.env.JWT_SECRET],
//     maxAge: 24 * 60 * 60 * 1000
// }))

server.use('/api/patient', patientRoutes);

server.use('/api/doctor', doctorRoutes);

server.use('/api/admin', adminRoutes);

server.use('/api/medicinegroups', medicineGroupsRoutes);

server.use('/api/medicineitems', medicineItemRoutes);

server.use('/api/itemstocks', itemStocksRoutes);

server.use('/api/wishlist', wishListRoutes);

server.use('/api/order', orderRoutes);

server.use('/api/pharmacy', pharmacyRoutes);

server.use('/api/notifications', notificationRoutes);

//To handle common error/success responses for endpoints
// Define error-handling middleware functions in the same way as other middleware functions, 
// except with four arguments instead of three, specifically with the signature (err, req, res, next))
server.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err?.message;

    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a == err.status) ? true : false,
        message: message,
        status: statusCode,
        data: err.data,
        stack: err?.stack
    })
})

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected with MongoDB");
    } catch (error) {
        console.log("Connection failed to MongoDB", error);
    }
};

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectMongoDB();
});