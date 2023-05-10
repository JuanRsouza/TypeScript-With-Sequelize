import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async getAllTeams() {
    const teams = await this.teamModel.getAllTeams();
    return teams;
  }
}
