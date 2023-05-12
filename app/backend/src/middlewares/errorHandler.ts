import { NextFunction, Request, Response } from 'express';
import ErrorApi from '../utils/ErrorApi';

export default (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorApi) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: 'Internal server error' });
};
