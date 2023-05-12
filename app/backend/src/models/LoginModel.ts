import Users from '../database/models/Users';

export default class LoginModel {
  constructor(private user = Users) {}

  async getUserByEmail(email: string) {
    const user = await this.user.findOne({ where: { email } });
    return user as Users;
  }

  async getUserById(id: number) {
    const user = await this.user.findOne({ where: { id } });
    return user as Users;
  }
}
