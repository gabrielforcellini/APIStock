import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export class UserController {
  static async register(req: Request, res: Response) {
    const {
      name,
      lastname,
      mail,
      password,
      telephone,
      address,
    } = req.body;

    const user = new User();
    user.name = name;
    user.lastname = lastname;
    user.mail = mail;
    user.telephone = telephone;
    user.password = password;
    user.address = address;

    try {
      await AppDataSource.manager.save(user);
      res.status(201).json({ message: "Registered user!" });
    } catch (error) {
      res.status(500).json({ error });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const userRespository = AppDataSource.getRepository(User);
      const users = await userRespository.find();
      res.status(200).json({ users, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ user, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;

    const {
      name,
      lastname,
      mail,
      telephone,
      password,
      address
    } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const userToUpdate = await userRepository.findOneBy({
        id: parseInt(id)
      });
      userToUpdate.name = name;
      userToUpdate.lastname = lastname;
      userToUpdate.mail = mail;
      userToUpdate.telephone = telephone;
      userToUpdate.password = password;
      userToUpdate.address = address;
      await userRepository.save(userToUpdate);
      res.status(200).json({ userToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const userToDelete = await userRepository.findOneBy({
        id: parseInt(id)
      });
      await userRepository.remove(userToDelete);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
}