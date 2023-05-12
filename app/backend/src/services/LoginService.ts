import * as bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth/jwtAuthorization';
import LoginModel from '../models/LoginModel';
import ErrorApi from '../utils/ErrorApi';

export default class LoginService {
  constructor(private loginModel = new LoginModel()) {}

  async login(email: string, password: string) {
    const user = await this.loginModel.getUserByEmail(email);
    if (!user) {
      throw new ErrorApi('Invalid email or password', 401);
    }
    const comparePasswords = bcrypt.compareSync(password, user.password);
    if (password === undefined || !comparePasswords) {
      throw new ErrorApi('Invalid email or password', 401);
    }
    const token = generateToken({ id: user.id });
    return token;
  }
}
