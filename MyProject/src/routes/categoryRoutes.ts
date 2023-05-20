import express from "express";
import { CategoryController } from '../controllers/CategoryController';

const categoryRoutes = express.Router();

// Create
categoryRoutes.post("/create", CategoryController.register);

// Find one
categoryRoutes.get("/find-one/:id", CategoryController.findOneById);

// Find All
categoryRoutes.get("/find-all", CategoryController.findAll);

// Update
categoryRoutes.patch("/:id", CategoryController.updateOne);

// Delete
categoryRoutes.delete("/:id", CategoryController.delete);

export default categoryRoutes;