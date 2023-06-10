import express from "express";
import { UserController } from '../controllers/UserController';
import { checkToken } from '../helpers/checkToken';

const userRouter = express.Router();

// Create
userRouter.post("/create/establishment=:establishment_id", UserController.create);

// Find one
userRouter.get("/find-one/:id", UserController.findOneById);

// Find All
userRouter.get("/find-all", UserController.findAll);

// Update
userRouter.patch("/:id", checkToken, UserController.updateOne);

// Delete
userRouter.delete("/:id", checkToken, UserController.delete);

// Login
userRouter.post("/login", UserController.login);

//Verify User
userRouter.get("/checkuser", UserController.checkUser);

export default userRouter;