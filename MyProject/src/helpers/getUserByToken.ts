import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

dotenv.config();

const SECRET = process.env.SECRET;

interface DecodedToken extends JwtPayload {
  id: string;
};

export const getUserByToken = async (req: Request, res: Response, token: string) => {

    if(!token) {
        return res.status(401).json({ message: "Access denied!" });
    };

    const decoded = jwt.verify(token, SECRET) as DecodedToken;

    const userId = decoded.id;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(userId) });

    return user;
};