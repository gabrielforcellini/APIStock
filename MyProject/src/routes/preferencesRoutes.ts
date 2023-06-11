import express from "express";
import { PreferencesController } from '../controllers/PreferencesController';

const preferencesRouter = express.Router();

// Create
preferencesRouter.post("/create/establishment=:establishment_id", PreferencesController.create);

// Find one
preferencesRouter.get("/find-one/:id", PreferencesController.findOneById);

// Find All
preferencesRouter.get("/find-all", PreferencesController.findAll);

// Update
preferencesRouter.patch("/:id", PreferencesController.updateOne);

// Delete
preferencesRouter.delete("/:id", PreferencesController.delete);

export default preferencesRouter;