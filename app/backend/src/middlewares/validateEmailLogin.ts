import { NextFunction, Request, Response } from 'express';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (typeof email !== 'string' || !validEmail.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};
export default validateEmail;
