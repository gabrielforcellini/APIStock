import express from "express";
import { Category } from "../entity/Category";
import { stockProductController } from "../controllers/StockProductController";

const stockProductRouter = express.Router();

stockProductRouter.post(
    "/alta/stock=:stock_id/product=:product_id/quantity=:quantity",
    stockProductController.addToStock
);


export default stockProductRouter;