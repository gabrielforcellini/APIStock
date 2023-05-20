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
    endereco_id
  } = req.body;

  const user = new User();
  user.nome = nome;
  user.sobrenome = sobrenome;
  user.email = email;
  user.telefone = telefone;
  user.senha = senha;
  user.endereco_id = endereco_id;

  try {
    await AppDataSource.manager.save(user);
    res.status(201).json({ message: "Registered user!" });
  } catch (error) {
    res.status(500).json({ error: error });
  };
});

// FindOne
userRouter.get("/find-one/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
});

// FindAll
userRouter.get("/find-all", async (req: Request, res: Response) => {
  try {
    const userRespository = AppDataSource.getRepository(User);
    const users = await userRespository.find();
    res.status(200).json({ users, success: true });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
});

// Update
userRouter.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const {
    nome,
    sobrenome,
    email,
    telefone,
    senha,
    endereco_id
  } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({
      id: parseInt(id)
    });
    userToUpdate.nome = nome;
    userToUpdate.sobrenome = sobrenome;
    userToUpdate.email = email;
    userToUpdate.telefone = telefone;
    userToUpdate.senha = senha;
    userToUpdate.endereco_id = endereco_id;
    await userRepository.save(userToUpdate);
    res.status(200).json({ userRepository, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
});

export default userRouter;