import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUserToken } from '../helpers/createUserToken';
import dotenv from 'dotenv';
import { getToken } from '../helpers/getToken';
import { getUserByToken } from '../helpers/getUserByToken';
import { Establishment } from '../entity/Establishment';

dotenv.config();

const SECRET = process.env.secret;

export class UserController {
  
  static async create(req: Request, res: Response) {
    const { name, lastname, mail, password, telephone } = req.body;
    const establishment_id = req.params.establishment_id;

    try {
      // Check if user already exists.
      const userRepository = AppDataSource.getRepository(User);
      const userExists = await userRepository.findOneBy({ mail: mail });
      if (userExists) {
        return res.status(404).json({ message: "E-mail already registered! Please try another.", success: false });
      };
      //create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const establishmentRespository = AppDataSource.getRepository(Establishment)
      const establishment = await establishmentRespository.findOneBy({id: parseInt(establishment_id)});

      if(!establishment){ 
        return res.status(500).json({ message: "Estabelecimento não existe"})
      }

      const user = new User();
      user.name = name;
      user.lastname = lastname;
      user.mail = mail;
      user.telephone = telephone;
      user.password = passwordHash;
      user.establishment = establishment;

      const newUser = await userRepository.save(user);
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async login(req: Request, res: Response) {
    const { mail, password } = req.body;

    if (!mail) {
      return res.status(422).json({ message: "Email Required!", success: false });
    };

    if (!password) {
      return res.status(422).json({ message: "Password Required!", success: false });
    };

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ mail: mail });

    if (!user) {
      return res.status(404).json({ message: "User does not exist!", success: false });
    };

    //check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Invalid password!", success: false });
    };

    try {
      await createUserToken(user, req, res);
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async checkUser(req: Request, res: Response) {
    try {
      if (req.headers.authorization) {
        const token = getToken(req);

        const decoded = jwt.verify(token, SECRET) as { id: string };

        const userRepository = AppDataSource.getRepository(User);
        const currentUser = await userRepository.findOneBy({ id: parseInt(decoded.id) });

        currentUser.password = undefined;

        res.status(200).send(currentUser);
      } else {
        res.status(404).send({ error: "token required!", success: false });
      };
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const userRespository = AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .select("user").addSelect("establishment")
        .leftJoin("user.establishment", "establishment")
        .getMany();

      const users = await userRespository;
      res.status(200).json({ users, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const userRepository = AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .select("user").addSelect("establishment")
        .leftJoin("user.establishment", "establishment")
        .where("user.id = :id", {id: id})
        .getOne();

      const user = await userRepository;
      res.status(200).json({ user, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  /**
   * Update an user by token
   */
  static async updateOne(req: Request, res: Response) {
    try {
      const token = getToken(req);
      const userToUpdate = await getUserByToken(req, res, token);

      if (!userToUpdate) {
        return res.status(422).json({ message: "user not found!", success: false });
      };

      console.log(userToUpdate);      

      const {
        name,
        lastname,
        mail,
        telephone,
        password,
        establishment
      } = req.body;

      console.log(req.body);      

      const userRepository = AppDataSource.getRepository(User);

      if (name) {
        userToUpdate.name = name;
      };
      if (lastname) {
        userToUpdate.lastname = lastname;
      };
      if (mail) {
        userToUpdate.mail = mail;
      };
      if (password) {
        //create password
        const salt = await bcrypt.genSalt(12);
        userToUpdate.password = await bcrypt.hash(password, salt);
      };
      if (establishment) {
        userToUpdate.establishment = establishment;
      };
      if (telephone) {
        userToUpdate.telephone = telephone;
      };

      await userRepository.save(userToUpdate);
      res.status(200).json({ userToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const userRepository = AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .delete()
        .from("user")
        .where("id = :id", {id: id})
        .execute()
      await userRepository;
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};