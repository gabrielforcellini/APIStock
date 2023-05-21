import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.secret;

export const createUserToken = async (user: User, req: Request, res: Response) => {
  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, SECRET);
  res.status(200).json({ message: "User authenticated!", token: token });
};