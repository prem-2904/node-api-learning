import express from 'express';
import { createItemStock, updateItemStock } from '../controller/item-stock.controller.js';


const router = express.Router();

router.post('/createitemstock', createItemStock);

// router.get('/getitems', getitems);

router.post('/updateitemstock', updateItemStock);

export default router;