import express from "express";
import { EstablishmentController } from '../controllers/EstablishmentController';

const establishmentRouter = express.Router();

// Create.
establishmentRouter.post("/create/address=:address_id", EstablishmentController.register);

// Find one.
establishmentRouter.get("/find-by/id=:id", EstablishmentController.findById);

// Find All.
establishmentRouter.get("/find-all", EstablishmentController.findAll);

// Update.
establishmentRouter.patch("/update/id=:id", EstablishmentController.updateOne);

// Delete.
establishmentRouter.delete("/delete/id=:id", EstablishmentController.delete);

export default establishmentRouter;