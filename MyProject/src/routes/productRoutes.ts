import express from "express";
import { ProductController } from '../controllers/ProductController';

const productRouter = express.Router();

// Create.
productRouter.post("/create/category=:category_id", ProductController.register);

// Find All.
productRouter.get("/find-all", ProductController.findAll);

// Find by Id.
productRouter.get("/find-by/id=:id", ProductController.findById);

// Find by Category
productRouter.get("/find-by/category=:category_id", ProductController.findByCategory)

// Update.
productRouter.patch("/update/id=:id", ProductController.updateOne);

// Delete.
productRouter.delete("/delete/id=:id", ProductController.delete);

export default productRouter;