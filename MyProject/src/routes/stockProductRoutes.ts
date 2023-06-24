import express from "express";
import { stockProductController } from "../controllers/StockProductController";

const stockProductRouter = express.Router();

stockProductRouter.patch(
    "/alta/stock=:stock_id/product=:product_id/quantity=:quantity",
    stockProductController.addToStock
);

stockProductRouter.patch(
    "/baixa/stock=:stock_id/product=:product_id/quantity=:quantity",
    stockProductController.removeToStock
);

stockProductRouter.get(
    "/find-products-by/stock=:stock_id",
    stockProductController.findProductsByStock
)

export default stockProductRouter;