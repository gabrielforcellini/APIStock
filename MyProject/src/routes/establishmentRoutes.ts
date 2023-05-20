import express from "express";
import { EstablishmentController } from '../controllers/EstablishmentController';

const establishmentRouter = express.Router();

// Create.
establishmentRouter.post("/create", EstablishmentController.register);

// Find one.
establishmentRouter.get("/find-one/:id", EstablishmentController.findOneById);

// Find All.
establishmentRouter.get("/find-all", EstablishmentController.findAll);

// Update.
establishmentRouter.patch("/:id", EstablishmentController.updateOne);

// Delete.
establishmentRouter.delete("/:id", EstablishmentController.delete);

export default establishmentRouter;