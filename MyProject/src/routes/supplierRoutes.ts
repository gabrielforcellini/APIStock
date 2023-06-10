import express from "express";
import { SupplierController } from '../controllers/SupplierController';

const supplierRouter = express.Router();

// Create.
supplierRouter.post("/create/address=:address_id", SupplierController.register);

// Find one.
supplierRouter.get("/find-one/:id", SupplierController.findOneById);

// Find All.
supplierRouter.get("/find-all", SupplierController.findAll);

// Update.
supplierRouter.patch("/:id", SupplierController.updateOne);

// Delete.
supplierRouter.delete("/:id", SupplierController.delete);

export default supplierRouter;