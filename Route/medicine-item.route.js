import express from 'express';
import { createItem, getItems, getItemsByID, updateItem } from '../controller/medicine-item.controller.js';


const router = express.Router();

router.post('/createitem', createItem);

router.get('/getitems', getItems);

router.post('/updateitem', updateItem);

router.get('/getitem/:id', getItemsByID);

// router.get('/getitemsbycategory', getitemsByCategory);

export default router;