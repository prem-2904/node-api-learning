import express from "express";
import { addToCart, getCounts, getUserCart, getUserWishList, markWishlist, removeFromCart, removeWishList } from "../controller/wishlist.controller.js";

const router = express.Router();


router.post('/markforwishlist', markWishlist);

router.post('/removewishlist', removeWishList);

router.get('/getwishlist', getUserWishList);

router.post('/addtocart', addToCart);

router.post('/removecartitem', removeFromCart);

router.get('/getusercart', getUserCart);

router.get('/getcounts', getCounts);


export default router;