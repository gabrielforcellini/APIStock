import express from "express";
import { CategoryController } from '../controllers/CategoryController';

const categoryRouter = express.Router();

// Create
categoryRouter.post("/create", CategoryController.register);

// Find one
categoryRouter.get("/find-one/:id", CategoryController.findOneById);

// Find All
categoryRouter.get("/find-all", CategoryController.findAll);

// Update
categoryRouter.patch("/:id", CategoryController.updateOne);

// Delete
categoryRouter.delete("/:id", CategoryController.delete);

export default categoryRouter;