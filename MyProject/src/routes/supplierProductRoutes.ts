import express from "express";
import { supplierProductController } from "../controllers/SupplierProductController";

const supplierProductRouter = express.Router();

supplierProductRouter.post(
    "/supplier=:supplier_id/product=:product_id",
    supplierProductController.associate
);

supplierProductRouter.get(
    "/find-products-by/supplier=:supplier_id",
    supplierProductController.findProductsBySupplier
);

export default supplierProductRouter;