import { NextFunction, Response } from 'express';
import IRequestUser from '../utils/IRequestUser';
import { verifyToken } from '../utils/auth/jwtAuthorization';

export default (req: IRequestUser, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  const user = verifyToken(authorization);
  req.user = user;
  next();
};
