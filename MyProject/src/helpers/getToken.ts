import { Request } from 'express';

/**
 * Obtém token da requisição para validações
 */
export const getToken = (req: Request) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  return token;
};