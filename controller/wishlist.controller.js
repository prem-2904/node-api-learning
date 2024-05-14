import wishlistModel from "../models/patient.wishlist.model.js";
import addToCartModel from "../models/addToCart.model.js";
import { createError, createSuccess } from "../utils/reponseStruct.js";

export const markWishlist = async (req, res, next) => {
    try {
        const wishList = new wishlistModel({
            userId: req.body.userId,
            itemId: req.body.itemId,
            markedFav: req.body.markedFav,
            isDeleted: false
        });

        await wishList.save();
        return next(createSuccess(201, 'Added to wishlist', wishList._id));
    } catch (error) {
        return next(createError(500, 'Something went wrong' - error))
    }
}

export const removeWishList = async (req, res, next) => {
    try {
        const wishListId = await wishlistModel.findById({ _id: req.body.id });

        if (wishListId) {
            await wishlistModel.findByIdAndUpdate(
                req.body.id,
                { $set: req.body.details },
            )
            return next(createSuccess(200, 'Removed from wishlist'));
        }
        return next(createError(404, 'Item not found'));
    } catch (error) {
        return next(createError(500, 'Something went wrong' - error))
    }
}

export const getUserWishList = async (req, res, next) => {
    try {
        const wishListed = await wishlistModel.find({ userId: req.query.id, isDeleted: false })
        // .populate('itemId')
        return next(createSuccess(200, '', wishListed));
    } catch (error) {
        return next(createError(500, 'Something went wrong' - error))
    }
}


export const addToCart = async (req, res, next) => {
    try {
        const cart = new addToCartModel({
            userId: req.body.userId,
            itemId: req.body.itemId,
            addedToCart: req.body.addedToCart,
            isDeleted: false
        });

        await cart.save();
        return next(createSuccess(201, 'Added to cart', cart._id));
    } catch (error) {
        return next(createError(500, 'Something went wrong' - error))
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        const cartId = await addToCartModel.findById({ _id: req.body.id });

        if (cartId) {
            const cart = await addToCartModel.findByIdAndUpdate(
                req.body.id,
                { $set: req.body.details },
            )
            return next(createSuccess(200, 'Removed from cart', cart._id));
        }
        return next(createError(404, 'Item not found'));
    } catch (error) {
        return next(createError(500, 'Something went wrong' - error))
    }
}

export const getUserCart = async (req, res, next) => {
    try {
        const cart = await addToCartModel.find({ userId: req.query.id, isDeleted: false })
            .populate('itemId')
            .populate('itemstockavailability');
        return next(createSuccess(200, '', cart));
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}


export const getCounts = async (req, res, next) => {
    try {
        const cartCount = await addToCartModel.find({ userId: req.query.id, isDeleted: false }).countDocuments();
        const wishListCount = await wishlistModel.find({ userId: req.query.id, isDeleted: false }).countDocuments();

        return next(createSuccess(200, '', { cartCount, wishListCount }));
    } catch (error) {
        return next(createError(500, 'Something went wrong' + error))
    }
}