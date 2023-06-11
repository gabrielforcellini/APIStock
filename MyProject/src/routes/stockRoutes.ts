import express from "express";
import { StockController } from "../controllers/StockController";

const stockRouter = express.Router();

// Create
stockRouter.post("/create/establishment=:establishment_id", StockController.create);

// Find one
stockRouter.get("/find-one/:id", StockController.findOneById);

// Find All
stockRouter.get("/find-all", StockController.findAll);

// Update
stockRouter.patch("/:id/establishment=:establishment_id", StockController.updateOne);

// Delete
stockRouter.delete("/:id", StockController.delete);

export default stockRouter;