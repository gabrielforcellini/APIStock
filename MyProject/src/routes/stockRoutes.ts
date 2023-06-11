import express from "express";
import { StockController } from "../controllers/StockController";

const stockRouter = express.Router();

// Find All
stockRouter.get("/find-all", StockController.findAll);

// Find one
stockRouter.get("/find-by/id=:id", StockController.findOneById);

// Find by Establishment
stockRouter.get("/find-By/establishment=:establishment_id", StockController.findByEstablishment)

// Create
stockRouter.post("/create/establishment=:establishment_id", StockController.create);

// Update
stockRouter.patch("/update/id=:id/establishment=:establishment_id", StockController.updateOne);

// Delete
stockRouter.delete("/delete/id=:id", StockController.delete);

export default stockRouter;