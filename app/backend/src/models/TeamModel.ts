import Teams from '../database/models/Teams';

export default class TeamModel {
  constructor(private team = Teams) {}

  async getAllTeams() {
    const teams = await this.team.findAll();
    return teams;
  }
}
