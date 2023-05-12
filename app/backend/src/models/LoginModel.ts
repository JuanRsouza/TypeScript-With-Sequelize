import Users from '../database/models/Users';

export default class LoginModel {
  constructor(private user = Users) {}

  async getUserByEmail(email: string) {
    const user = await this.user.findOne({ where: { email } });
    return user as Users;
  }
}
