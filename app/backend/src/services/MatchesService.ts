import ErrorApi from '../utils/ErrorApi';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamModel';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel(), private modelTeam = new TeamsModel()) {}

  async getAllMatches(inProgress: string | undefined) {
    if (inProgress === undefined) {
      const matches = await this.matchesModel.getAllMatches();
      return matches;
    }
    const changeToBoolean = inProgress === 'true';
    const matches = await this.matchesModel.getMatchesForProgress(changeToBoolean);
    return matches;
  }

  async finishMatch(id: number) {
    const match = await this.matchesModel.finishMatch(id);
    return match;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return match;
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    if (homeTeamId === awayTeamId) {
      throw new ErrorApi('It is not possible to create a match with two equal teams', 422);
    }
    const verifyHomeTeam = await this.modelTeam.getTeamById(homeTeamId);
    const verifyAwayTeam = await this.modelTeam.getTeamById(awayTeamId);
    if (!verifyHomeTeam || !verifyAwayTeam) {
      throw new ErrorApi('There is no team with such id!', 404);
    }
    const newMatch = await this.matchesModel
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return newMatch;
  }
}
