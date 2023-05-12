import { Request, Response } from 'express';
import IRequestUser from '../utils/IRequestUser';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.loginService.login(email, password);
    return res.status(200).json({ token });
  }

  async getRole(req: IRequestUser, res: Response) {
    const { id } = req.user || {};
    const role = await this.loginService.getRole(Number(id));
    return res.status(200).json({ role });
  }
}
