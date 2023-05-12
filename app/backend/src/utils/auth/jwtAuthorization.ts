import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'SECRET';

type AppJwtPayload = {
  id: number,
};

export function generateToken(payload: AppJwtPayload): string {
  const token = jwt.sign(payload, SECRET);
  return token;
}

export function verifyToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, SECRET);
  return decoded as AppJwtPayload;
}
