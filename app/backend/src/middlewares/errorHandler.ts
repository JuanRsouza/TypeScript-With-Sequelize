import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ErrorApi from '../utils/ErrorApi';

export default (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorApi) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  console.log(err);
  return res.status(500).json({ message: 'Internal server error' });
};
