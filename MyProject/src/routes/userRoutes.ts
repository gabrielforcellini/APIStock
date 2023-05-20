import express, { Request, Response } from "express";
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

const userRouter = express.Router();

//create
userRouter.post("/create", async (req: Request, res: Response) => {
  const {
    nome,
    sobrenome,
    email,
    telefone,
    senha,
  } = req.body;

  const user = new User();
  user.nome = nome;
  user.sobrenome = sobrenome;
  user.email = email;
  user.telefone = telefone;
  user.senha = senha;

  try {
    await AppDataSource.manager.save(user);
    res.status(201).json({ message: "Registered user!" });
  } catch (error) {
    res.status(500).json({ error: error });
  };
});

export default userRouter;