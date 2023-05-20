import express from "express";
import { UserController } from '../controllers/UserController';

const userRouter = express.Router();

// Create
userRouter.post("/create", UserController.register);

// Find one
userRouter.get("/find-one/:id", UserController.findOneById);

// Find All
userRouter.get("/find-all", UserController.findAll);

// Update
userRouter.patch("/:id", UserController.updateOne);

// Delete
userRouter.delete("/:id", UserController.delete);

export default userRouter;