import express from "express";
import { ProductController } from '../controllers/ProductController';

const productRouter = express.Router();

// Create.
productRouter.post("/create", ProductController.register);

// Find one.
productRouter.get("/find-one/:id", ProductController.findOne);

// Find All.
productRouter.get("/find-all", ProductController.findAll);

// Update.
productRouter.patch("/:id", ProductController.updateOne);

// Delete.
productRouter.delete("/:id", ProductController.delete);

export default productRouter;