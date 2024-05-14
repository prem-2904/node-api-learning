import itemStock from "../models/item-stock.model.js";
import { createError, createSuccess } from "../utils/reponseStruct.js";

export const createItemStock = async (req, res, next) => {
    try {
        if (!req.body) {
            return next(createError(400, 'Bad data request'));
        }

        const tableStock = new itemStock({
            itemId: req.body.itemId,
            stocksAvailability: req.body.stocksAvailability,
            itemDiscount: req.body.itemDiscount,
            expirationDate: req.body.expirationDate,
            stockFilledDate: req.body.stockFilledDate,
            itemPrice: req.body.itemPrice,
            updatedBy: req.body.updatedBy,
            isSaleCompleted: false
        });

        await tableStock.save();
        return next(createSuccess(200, 'Item stock added successfully'));
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`))
    }
}

export const updateItemStock = async (req, res, next) => {
    try {
        if (!req.body) {
            return next(createError(400, 'Bad data request'));
        }

        const stockID = await itemStock.findById({ _id: req.body.stockID });

        if (!stockID) {
            return next(createError(404, 'No items found to update'));
        }
        let existingStockCount = stockID?.stocksAvailability;
        let updatedStockCount = 0;
        updatedStockCount = existingStockCount + req.body.stocks.stocksAvailability;

        req.body.stocks["stocksAvailability"] = updatedStockCount;

        await itemStock.findByIdAndUpdate(
            req.body.stockID,
            { $set: req.body.stocks },
            { $new: true }
        )

        return next(createSuccess(200, 'Item stock updated successfully'));
    } catch (error) {
        return next(createError(500, `Internal Server Error ${error}`))
    }
}

export const getItemStocks = async (req, res, next) => {

}


export const updateStocksOnOrder = async (stockDetails) => {
    const stockID = await itemStock.findById({ _id: stockDetails.stockId });

    if (!stockID) {
        return next(createError(404, 'No items found to update'));
    }
    let existingStockCount = stockID?.stocksAvailability;
    let updatedStockCount = 0;
    updatedStockCount = existingStockCount - stockDetails.orderedQuantity;
    const payload = {
        stocksAvailability: updatedStockCount
    }

    await itemStock.findByIdAndUpdate(
        stockDetails.stockId,
        { $set: payload },
        { $new: true }
    )
}