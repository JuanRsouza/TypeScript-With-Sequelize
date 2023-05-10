import Teams from '../database/models/Teams';

export default class TeamModel {
  constructor(private team = Teams) {}

  async getAllTeams() {
    const teams = await this.team.findAll();
    return teams;
  }

  async getTeamById(id: number) {
    const team = await this.team.findOne({ where: { id } });
    return team;
  }
}
