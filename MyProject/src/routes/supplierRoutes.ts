import express from "express";
import { SupplierController } from '../controllers/SupplierController';

const supplierRouter = express.Router();

// Create.
supplierRouter.post("/create/address=:address_id", SupplierController.register);

// Find All.
supplierRouter.get("/find-all", SupplierController.findAll);

// Find by Id.
supplierRouter.get("/find-by/id=:id", SupplierController.findById);

// Update.
supplierRouter.patch("/update/id=:id", SupplierController.updateOne);

// Delete.
supplierRouter.delete("/delete/id=:id", SupplierController.delete);

export default supplierRouter;