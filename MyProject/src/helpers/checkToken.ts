import { NextFunction, Request, Response } from 'express';
import { getToken } from './getToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET;

//middleware to validate Token
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Access denied!", success: false });
    };

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "Access denied!", success: false });
    };

    try {
        const verified = jwt.verify(token, SECRET);
        req.body.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token!", success: false });
    };
};